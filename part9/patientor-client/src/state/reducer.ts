import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES"
      payload: Array<Diagnosis>
    };

export const setPatientList = (patients: Array<Patient>): Action => {
  return {
    type : "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const setDiagnoses = (diagnoses: Array<Diagnosis>): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses
  };
};

export const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...state.patients,
          ...Object.fromEntries(payload.map(patient => [ patient.id, patient ]))
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [payload.id]: payload
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          ...Object.fromEntries(payload.map(diagnosis => [ diagnosis.code, diagnosis ]))
        }
      };
    default:
      return state;
  }
};
