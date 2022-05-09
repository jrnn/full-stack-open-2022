import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const baseUri = `${apiBaseUrl}/diagnoses`;

export const fetchDiagnoses = async (): Promise<Array<Diagnosis>> => {
  const response = await axios.get<Array<Diagnosis>>(baseUri);
  return response.data;
};
