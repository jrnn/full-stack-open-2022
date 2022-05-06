import { FC } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import { useStateValue } from "../state";
import { EntryDto } from "../types";

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (dto: EntryDto) => void
}

const AddEntryModal: FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const { diagnoses } = useStateValue();
  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>Add new entry</DialogTitle>
      <DialogContent>
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
