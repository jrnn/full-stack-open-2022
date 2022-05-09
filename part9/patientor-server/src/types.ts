type ObjectIndex = string | number | symbol;
type DistributiveOmit<T, K extends ObjectIndex> = T extends unknown
  ? Omit<T, K>
  : never;

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

interface EntryBase {
  id: string
  date: string
  specialist: string
  diagnosisCodes?: Array<string>
  description: string
}

interface EntryHospital extends EntryBase {
  type: "Hospital"
  discharge: {
    date: string
    criteria: string
  }
}

interface EntryOccupational extends EntryBase {
  type: "OccupationalHealthcare"
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

interface EntryHealthCheck extends EntryBase {
  type: "HealthCheck",
  healthCheckRating: number
}

export type Entry = EntryHospital | EntryOccupational | EntryHealthCheck;
export type EntryDto = DistributiveOmit<Entry, "id">;

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
export type PatientDto = Omit<Patient, "entries" | "id">;

export interface UnsafePatientDto {
  name?: unknown
  dateOfBirth?: unknown
  ssn?: unknown
  gender?: unknown
  occupation?: unknown
}

export interface UnsafeEntryDto {
  type?: unknown
  date?: unknown
  specialist?: unknown
  diagnosisCodes?: unknown
  description?: unknown
  discharge?: unknown
  employerName?: unknown
  sickLeave?: unknown
  healthCheckRating?: unknown
}
