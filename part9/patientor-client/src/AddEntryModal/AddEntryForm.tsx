import { FC } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, NumberField, TextField } from "../components/FormField";
import { assertNever, validateEntryForm } from "../services";
import { Diagnosis, EntryFormValues, EntryType } from "../types";

interface Props {
  diagnoses: Array<Diagnosis>
  onCancel: () => void
  onSubmit: (values: EntryFormValues) => void
  type: EntryType
}

const initialValues: EntryFormValues = {
  date: "",
  specialist: "",
  description: "",
  diagnosisCodes: [],
  discharge: {
    date: "",
    criteria: ""
  },
  employerName: "",
  sickLeave: {
    startDate: "",
    endDate: ""
  },
  healthCheckRating: 0
};

const TypeSpecificFields: FC<{ type: EntryType }> = ({ type }) => {
  switch (type) {
    case "Hospital":
      return (
        <>
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
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <Field
            name="employerName"
            label="Employer name"
            placeholder="Solutions Solutions Inc."
            component={TextField}
          />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Field
                name="sickLeave.startDate"
                label="Sick leave from"
                placeholder="YYYY-MM-DD"
                component={TextField}
              />
            </Grid>
            <Grid item xs={6}>
              <Field
                name="sickLeave.endDate"
                label="Until"
                placeholder="YYYY-MM-DD"
                component={TextField}
              />
            </Grid>
          </Grid>
        </>
      );
    case "HealthCheck":
      return (
        <>
          <Field
            name="healthCheckRating"
            label="Rating"
            placeholder="1"
            component={NumberField}
          />
        </>
      );
    default:
      return assertNever(type);
  }
};

const AddEntryForm: FC<Props> = ({ diagnoses, onCancel, onSubmit, type }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validate={values => validateEntryForm(type, values)}
  >
    {({ dirty, isValid, setFieldTouched, setFieldValue }) => (
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
        <TypeSpecificFields type={type} />
        <ButtonGroup>
          <Button
            disabled={!dirty || !isValid}
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
        </ButtonGroup>
      </Form>
    )}
  </Formik>
);

export default AddEntryForm;
