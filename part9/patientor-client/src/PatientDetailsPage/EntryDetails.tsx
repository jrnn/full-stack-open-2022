import { FC } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useStateValue } from "../state";
import { Diagnosis, Entry } from "../types";

interface Props {
  entry: Entry
}

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
        </CardContent>
      </Card>
    </Box>
  );
};

export default EntryDetails;
