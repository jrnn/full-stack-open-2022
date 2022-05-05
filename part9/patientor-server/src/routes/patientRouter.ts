import { Router } from "express";
import { patientService } from "../services";

export const router = Router();

router.get("/", (_, response) => {
  const patients = patientService.getAll();
  return response.status(200).json(patients);
});
