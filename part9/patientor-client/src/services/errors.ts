import axios, { AxiosError } from "axios";

type AxiosErrorWithErrorString = AxiosError<{ error: string }>;

const isAxiosErrorWithErrorString = (e: unknown): e is AxiosErrorWithErrorString => {
  if (!axios.isAxiosError(e)) {
    return false;
  }
  const data = e.response?.data;
  if (!data || typeof data !== "object") {
    return false;
  }
  const { error } = data as { error?: unknown };
  return !!error && typeof error === "string";
};

export const interpretErrorMessage = (error: unknown): string => {
  return isAxiosErrorWithErrorString(error)
    ? error.response?.data.error || "Unrecognized Axios error"
    : "Unknown error";
};
