export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other"
}

export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
}

export type PatientWithoutSsn = Omit<Patient, "ssn">;
export type PatientDto = Omit<Patient, "id">;

export interface UnsafePatientDto {
  name?: unknown
  dateOfBirth?: unknown
  ssn?: unknown
  gender?: unknown
  occupation?: unknown
}
