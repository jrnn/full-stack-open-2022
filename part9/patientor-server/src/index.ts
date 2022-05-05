import express from "express";

const MODE = process.env["NODE_ENV"] || "development";
const PORT = 3000;

const app = express();

app.use(express.json());

app.get("/ping", (_, response) => {
  response.status(200).send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Now running on port ${PORT} in ${MODE} mode.`);
});
