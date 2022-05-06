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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Entry {
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
  entries: Array<Entry>
}

export type SanitizedPatient = Omit<Patient, "entries" | "ssn">;
export type PatientDto = Omit<Patient, "id">;

export interface UnsafePatientDto {
  name?: unknown
  dateOfBirth?: unknown
  ssn?: unknown
  gender?: unknown
  occupation?: unknown
}
