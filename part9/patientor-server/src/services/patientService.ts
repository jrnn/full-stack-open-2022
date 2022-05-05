import patients from "../data/patients";
import { PatientWithoutSsn } from "../types";

export const getAll = (): Array<PatientWithoutSsn> => {
  return patients.map(patient => {
    const { ssn, ...rest } = patient;
    return rest;
  });
};
