import { FC } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Entry } from "../types";

interface Props {
  entry: Entry
}

const EntryDetails: FC<Props> = ({ entry }) => {
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
              {entry.diagnosisCodes.map(code =>
                <li key={code}>
                  <Typography variant="body2">
                    {code}
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
