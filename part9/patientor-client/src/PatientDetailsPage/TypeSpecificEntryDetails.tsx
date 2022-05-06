import { FC } from "react";
import { Typography } from "@mui/material";
import { Entry } from "../types";

const assertNever = (_: never): never => {
  throw new Error(""
    + "In a dream world, this error will never be thrown. "
    + "So, if you see this error, it means you're living in a nightmare world.");
};

interface Props {
  entry: Entry
}

const TypeSpecificEntryDetails: FC<Props> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Typography variant="body2">
          Discharged on {entry.discharge.date} due to &quot;{entry.discharge.criteria}&quot;
        </Typography>
      );
    case "OccupationalHealthcare":
      return (!entry.sickLeave
        ? null
        :
        <Typography variant="body2">
          Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </Typography>
      );
    case "HealthCheck":
      return (
        <Typography variant="body2">
          Rating: {entry.healthCheckRating}
        </Typography>
      );
    default:
      return assertNever(entry);
  }
};

export default TypeSpecificEntryDetails;
