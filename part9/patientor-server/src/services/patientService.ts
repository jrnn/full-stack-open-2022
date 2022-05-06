import { v4 as uuid } from "uuid";
import patients from "../data/patients";
import { Patient, PatientDto, SanitizedPatient } from "../types";

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
  const newPatient = {
    ...dto,
    id: uuid(),
    entries: []
  };
  patients.push(newPatient);
  return newPatient;
};
