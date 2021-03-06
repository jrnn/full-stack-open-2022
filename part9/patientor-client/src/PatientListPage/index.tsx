import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";
import { addPatient, useDispatch, useStateValue } from "../state";
import { createPatient } from "../services";

const PatientListPage = () => {
  const dispatch = useDispatch();
  const { patients } = useStateValue();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = (values: PatientFormValues) => {
    const create = async () => {
      try {
        const newPatient = await createPatient(values);
        dispatch(addPatient(newPatient));
        closeModal();
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          const data = e.response?.data as { error?: string } | undefined;
          console.error(data || "Unrecognized axios error");
          setError(data?.error || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
      }
    };
    void create();
  };

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow
              key={patient.id}
              hover
              onClick={() => navigate(`/patients/${patient.id}`)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
