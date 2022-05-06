import { Gender, PatientDto, UnsafePatientDto } from "../types";
import { isPropertyValue, isString, validateString } from "./utils";

const isGender = (s: string): s is Gender => {
  return isPropertyValue(Gender, s);
};

const validateGender = (value?: unknown): Gender => {
  if (isString(value) && isGender(value)) {
    return value;
  }
  throw new Error(`Mandatory attribute 'gender' is either missing or invalid. Must be one of = ${Object.values(Gender)}`);
};

export const toPatientDto = ({ name, dateOfBirth, ssn, gender, occupation }: UnsafePatientDto): PatientDto => {
  return {
    name: validateString("name", name),
    dateOfBirth: validateString("dateOfBirth", dateOfBirth),
    ssn: validateString("ssn", ssn),
    gender: validateGender(gender),
    occupation: validateString("occupation", occupation)
  };
};
