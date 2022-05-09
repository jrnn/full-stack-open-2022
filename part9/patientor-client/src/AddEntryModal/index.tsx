import { FC } from "react";
import { Alert, Dialog, DialogContent, DialogTitle } from "@mui/material";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import { useStateValue } from "../state";
import { EntryDto } from "../types";

interface Props {
  error: string | undefined
  isOpen: boolean
  onClose: () => void
  onSubmit: (dto: EntryDto) => void
}

const AddEntryModal: FC<Props> = ({ error, isOpen, onClose, onSubmit }) => {
  const { diagnoses } = useStateValue();
  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>Add new entry</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <AddHospitalEntryForm
          diagnoses={Object.values(diagnoses)}
          onCancel={onClose}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
