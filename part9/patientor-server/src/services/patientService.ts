import { v4 as uuid } from "uuid";
import patients from "../data/patients";
import { Entry, EntryDto, Patient, PatientDto, SanitizedPatient } from "../types";

export const getAll = (): Array<SanitizedPatient> => {
  return patients.map(patient => {
    const { entries, ssn, ...rest } = patient;
    return rest;
  });
};

export const getOne = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

export const create = (dto: PatientDto): Patient => {
  const newPatient: Patient = {
    ...dto,
    id: uuid(),
    entries: []
  };
  patients.push(newPatient);
  return newPatient;
};

export const addEntry = (patient: Patient, dto: EntryDto): Entry => {
  const newEntry: Entry = {
    ...dto,
    id: uuid()
  };
  patient.entries.push(newEntry);
  return newEntry;
};
