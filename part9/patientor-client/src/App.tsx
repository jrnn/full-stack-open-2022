import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { fetchPatients } from "./services";
import { setPatientList, useDispatch } from "./state";
import PatientListPage from "./PatientListPage";
import PatientDetailsPage from "./PatientDetailsPage";

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetch = async () => {
      try {
        const patients = await fetchPatients();
        dispatch(setPatientList(patients));
      } catch (e) {
        console.error(e);
      }
    };
    void fetch();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/patients/:id" element={<PatientDetailsPage />} />
            <Route path="/" element={<PatientListPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
