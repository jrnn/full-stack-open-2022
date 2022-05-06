import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { fetchPatient } from "../services";
import { addPatient, useDispatch, useStateValue } from "../state";

interface Props {
  id: string
}

const PatientDetailsPageWithId: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const { patients } = useStateValue();
  const patient = patients[id];

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const patientToUpdate = await fetchPatient(id);
        dispatch(addPatient(patientToUpdate));
      } catch (error) {
        console.error(error);
      }
    };
    if (patient && !patient.ssn) {
      fetchDetails();
    }
  }, [ dispatch, id, patient ]);

  if (!patient) {
    return <div>404</div>;
  }
  return (
    <div>
      <Box paddingTop={2}>
        <Typography variant="h5">
          {patient.name}
        </Typography>
      </Box>
      <Box paddingTop={2}>
        <Typography variant="body1" gutterBottom>
          Gender:&nbsp;{patient.gender}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Occupation:&nbsp;{patient.occupation}
        </Typography>
        <Typography variant="body1" gutterBottom>
          SSN:&nbsp;{patient.ssn || "N/A"}
        </Typography>
      </Box>
    </div>
  );
};

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error("PatientDetailsPage must be used in a parameterized route ending with '.../:id'");
  }
  return <PatientDetailsPageWithId id={id} />;
};

export default PatientDetailsPage;
