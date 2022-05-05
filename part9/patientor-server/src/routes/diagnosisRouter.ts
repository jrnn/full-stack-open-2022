import { Router } from "express";
import { diagnosisService } from "../services";

export const router = Router();

router.get("/", (_, response) => {
  const diagnoses = diagnosisService.getAll();
  return response.status(200).json(diagnoses);
});
