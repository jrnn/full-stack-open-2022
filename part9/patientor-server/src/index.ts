import express from "express";
import cors from "cors";
import { diagnosisRouter, patientRouter } from "./routes";

const MODE = process.env["NODE_ENV"] || "development";
const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_, response) => {
  response.status(200).send("Hello!");
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Now running on port ${PORT} in ${MODE} mode.`);
});
