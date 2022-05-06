import { v4 as uuid } from "uuid";
import { Patient, UnsafePatientDto } from "../types";
import { toPatientDto } from "../validators";

const data: Array<UnsafePatientDto> = [
  {
    name: "John McClane",
    dateOfBirth: "1986-07-09",
    ssn: "090786-122X",
    gender: "male",
    occupation: "New york city cop"
  },
  {
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-77A",
    gender: "male",
    occupation: "Cop"
  },
  {
    name: "Hans Gruber",
    dateOfBirth: "1970-04-25",
    ssn: "250470-555L",
    gender: "male",
    occupation: "Technician"
  },
  {
    name: "Dana Scully",
    dateOfBirth: "1974-01-05",
    ssn: "050174-432N",
    gender: "female",
    occupation: "Forensic Pathologist"
  },
  {
    name: "Matti Luukkainen",
    dateOfBirth: "1971-04-09",
    ssn: "090471-8890",
    gender: "male",
    occupation: "Digital evangelist"
  }
];

const patients: Array<Patient> = data
  .map(toPatientDto)
  .map(patient => ({
    ...patient,
    id: uuid(),
    entries: []
  }));

export default patients;
