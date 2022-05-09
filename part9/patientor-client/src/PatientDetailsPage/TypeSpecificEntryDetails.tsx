import { FC } from "react";
import Typography from "@mui/material/Typography";
import { assertNever } from "../services";
import { Entry } from "../types";

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
