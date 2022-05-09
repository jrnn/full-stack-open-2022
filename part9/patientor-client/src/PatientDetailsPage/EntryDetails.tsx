import { FC } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Healing from "@mui/icons-material/Healing";
import LocalHospital from "@mui/icons-material/LocalHospital";
import MedicalServices from "@mui/icons-material/MedicalServices";
import { useStateValue } from "../state";
import { Diagnosis, Entry } from "../types";
import TypeSpecificEntryDetails from "./TypeSpecificEntryDetails";

interface Props {
  entry: Entry
}

const getIconByType = ({ type }: Entry) => (
  <>
    {type === "Hospital" && <LocalHospital />}
    {type === "OccupationalHealthcare" && <MedicalServices />}
    {type === "HealthCheck" && <Healing />}
  </>
);

const EntryDetails: FC<Props> = ({ entry }) => {
  const { diagnoses } = useStateValue();
  const toDiagnosis = (code: string): Diagnosis => {
    return diagnoses[code] || { code, name: "" };
  };
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="caption">
            {entry.date}
            {getIconByType(entry)}
          </Typography>
          <Typography variant="body2">
            {entry.description}
          </Typography>
          {entry.diagnosisCodes &&
            <ul>
              {entry.diagnosisCodes.map(toDiagnosis).map(({ code, name }) =>
                <li key={code}>
                  <Typography variant="body2">
                    {code} {name}
                  </Typography>
                </li>
              )}
            </ul>
          }
          <TypeSpecificEntryDetails entry={entry} />
          <Typography variant="caption">
            Diagnosed by <b>{entry.specialist}</b>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EntryDetails;
