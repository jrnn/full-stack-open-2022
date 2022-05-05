import { Router } from "express";
import { patientService } from "../services";
import { UnsafePatientDto } from "../types";
import { toPatientDto } from "../validators";

export const router = Router();

router.get("/", (_, response) => {
  const patients = patientService.getAll();
  return response.status(200).json(patients);
});

router.post<unknown, unknown, UnsafePatientDto>("/", ({ body }, response) => {
  try {
    const newPatient = patientService.create(toPatientDto(body));
    return response.status(201).json(newPatient);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({ error: error.message });
    }
    return response.status(500).json({ error: "Oops! Something went wrong. Too bad!" });
  }
});
