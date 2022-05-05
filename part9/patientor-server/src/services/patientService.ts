import { v4 as uuid } from "uuid";
import patients from "../data/patients";
import { PatientDto, PatientWithoutSsn } from "../types";

export const getAll = (): Array<PatientWithoutSsn> => {
  return patients.map(patient => {
    const { ssn, ...rest } = patient;
    return rest;
  });
};

export const create = (dto: PatientDto): PatientWithoutSsn => {
  const newPatient = {
    ...dto,
    id: uuid()
  };
  patients.push(newPatient);
  const { ssn, ...rest } = newPatient;
  return rest;
};
