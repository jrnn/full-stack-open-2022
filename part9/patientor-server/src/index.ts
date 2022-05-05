import express from "express";
import cors from "cors";

const MODE = process.env["NODE_ENV"] || "development";
const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_, response) => {
  response.status(200).send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Now running on port ${PORT} in ${MODE} mode.`);
});
