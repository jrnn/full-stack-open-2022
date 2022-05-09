import { FC, useState } from "react";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useStateValue } from "../state";
import { EntryDto, EntryFormValues, EntryType } from "../types";
import AddEntryForm from "./AddEntryForm";
import TypeSelector from "./TypeSelector";

interface Props {
  error: string | undefined
  isOpen: boolean
  onClose: () => void
  onSubmit: (dto: EntryDto) => void
}

const AddEntryModal: FC<Props> = ({ error, isOpen, onClose, onSubmit }) => {
  const [ type, setType ] = useState<EntryType>("Hospital");
  const { diagnoses } = useStateValue();

  const handleSubmit = (values: EntryFormValues) => {
    const { sickLeave, ...rest } = values;
    const dto = sickLeave?.startDate || sickLeave?.endDate
      ? values
      : rest;

    onSubmit({ ...dto, type });
  };

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>Add new entry</DialogTitle>
      <DialogContent>
        <TypeSelector
          selectedType={type}
          select={t => setType(t)}
        />
        {error && <Alert severity="error">{error}</Alert>}
        <AddEntryForm
          diagnoses={Object.values(diagnoses)}
          onCancel={onClose}
          onSubmit={handleSubmit}
          type={type}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
