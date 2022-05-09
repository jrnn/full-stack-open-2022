type DistributiveOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
type UnionToIntersection<U> = (U extends unknown ? (u: U) => void : never) extends ((v: infer V) => void) ? V : never;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
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
export type EntryType = Entry["type"];
export type EntryDto = DistributiveOmit<Entry, "id">;
export type EntryFormValues = UnionToIntersection<DistributiveOmit<Entry, "id" | "type">>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Array<Entry>
}
