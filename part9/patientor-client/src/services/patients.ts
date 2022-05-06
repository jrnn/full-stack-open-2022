import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const baseUri = `${apiBaseUrl}/patients`;

export const fetchPatients = async (): Promise<Array<Patient>> => {
  const response = await axios.get<Array<Patient>>(baseUri);
  return response.data;
};

export const fetchPatient = async (id: string): Promise<Patient> => {
  const response = await axios.get<Patient>(`${baseUri}/${id}`);
  return response.data;
};

export const createPatient = async (patientDto: Omit<Patient, "id">): Promise<Patient> => {
  const response = await axios.post<Patient>(baseUri, patientDto);
  return response.data;
};
