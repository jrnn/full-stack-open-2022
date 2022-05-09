import { FC } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { EntryType } from "../types";

interface Props {
  selectedType: EntryType
  select: (type: EntryType) => void
}

interface Option {
  key: EntryType
  description: string
}

const options: Array<Option> = [
  {
    key: "Hospital",
    description: "Hospital"
  },
  {
    key: "OccupationalHealthcare",
    description: "Occupational"
  },
  {
    key: "HealthCheck",
    description: "Check-up"
  }
];

const TypeSelector: FC<Props> = ({ selectedType, select }) => (
  <ButtonGroup sx={{ paddingBottom: "1em" }}>
    {options.map(({ key, description }) =>
      <Button
        key={key}
        onClick={() => select(key)}
        type="button"
        variant={key === selectedType ? "contained" : "outlined"}
      >
        {description}
      </Button>
    )}
  </ButtonGroup>
);

export default TypeSelector;
