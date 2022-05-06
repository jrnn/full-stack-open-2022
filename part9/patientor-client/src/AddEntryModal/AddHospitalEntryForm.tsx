import { FC } from "react";
import { Field, Form, Formik } from "formik";
import { Diagnosis, EntryHospitalDto } from "../types";
import { DiagnosisSelection, TextField } from "../components/FormField";
import { Button } from "@mui/material";

interface Props {
  diagnoses: Array<Diagnosis>
  onCancel: () => void
  onSubmit: (values: EntryHospitalDto) => void
}

const initialValues: EntryHospitalDto = {
  type: "Hospital",
  date: "",
  specialist: "",
  description: "",
  diagnosisCodes: [],
  discharge: {
    date: "",
    criteria: ""
  }
};

const AddHospitalEntryForm: FC<Props> = ({ diagnoses, onCancel, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
  >
    {({ setFieldTouched, setFieldValue }) => (
      <Form>
        <Field
          name="date"
          label="Date"
          placeholder="YYYY-MM-DD"
          component={TextField}
        />
        <Field
          name="specialist"
          label="Specialist"
          placeholder="Your name here"
          component={TextField}
        />
        <Field
          name="description"
          label="Description"
          component={TextField}
        />
        <DiagnosisSelection
          diagnoses={diagnoses}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />
        <Field
          name="discharge.date"
          label="Discharge date"
          placeholder="YYYY-MM-DD"
          component={TextField}
        />
        <Field
          name="discharge.criteria"
          label="Discharge criteria"
          component={TextField}
        />
        <Button
          type="submit"
          variant="contained"
        >
          Add
        </Button>
        <Button
          onClick={onCancel}
          type="button"
          variant="contained"
        >
          Cancel
        </Button>
      </Form>
    )}
  </Formik>
);

export default AddHospitalEntryForm;
