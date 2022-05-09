import { EntryFormValues, EntryType } from "../types";
import { assertNever, isEmptyObject } from "./utils";

const NAIVE_YYYY_MM_DD = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

interface FormErrors {
  [ field: string ]: string | FormErrors
}

type Validator<U = unknown> = (u: U) => FormErrors;

const isNotEmpty = (fieldName: string): Validator => u => {
  return u
    ? {}
    : { [ fieldName ]: "Cannot be empty" };
};

const isValidDate = (fieldName: string): Validator<string> => s => {
  return NAIVE_YYYY_MM_DD.test(s) && !isNaN(Date.parse(s))
    ? {}
    : { [ fieldName ]: "Must be a valid date in format YYYY-MM-DD" };
};

const isValidInteger = (fieldName: string): Validator => u => {
  return Number.isInteger(u)
    ? {}
    : { [ fieldName ]: "Must be a valid integer" };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EntryFormValidator = [ keyof EntryFormValues, Validator<any> ];

// What a horror show. Should've used Yup or something, but no, I had to try
// and get my fingers burned. Never again.
//
const getEntryFormValidators = (type: EntryType): Array<EntryFormValidator> => {
  const validators: Array<EntryFormValidator> = [
    [ "date", isValidDate("date") ],
    [ "specialist", isNotEmpty("specialist") ],
    [ "description", isNotEmpty("description") ]
  ];
  switch (type) {
    case "Hospital": {
      return [
        ...validators,
        [ "discharge", ({ date, criteria }: { date: string, criteria: string }) => {
          const discharge = {
            ...isValidDate("date")(date),
            ...isNotEmpty("criteria")(criteria)
          };
          return isEmptyObject(discharge) ? {} : { discharge };
        }]
      ];
    }
    case "OccupationalHealthcare": {
      return [
        ...validators,
        [ "employerName", isNotEmpty("employerName") ],
        [ "sickLeave", ({ startDate, endDate }: { startDate: string, endDate: string }) => {
          if (startDate || endDate) {
            const sickLeave = {
              ...isValidDate("startDate")(startDate),
              ...isValidDate("endDate")(endDate)
            };
            if (!isEmptyObject(sickLeave)) {
              return { sickLeave };
            }
          }
          return {};
        }]
      ];
    }
    case "HealthCheck": {
      return [
        ...validators,
        [ "healthCheckRating", isValidInteger("healthCheckRating") ]
      ];
    }
    default:
      return assertNever(type);
  }
};

export const validateEntryForm = (type: EntryType, values: EntryFormValues): FormErrors => {
  return getEntryFormValidators(type)
    .map(([ key, validator ]) => validator(values[key]))
    .filter(errors => !isEmptyObject(errors))
    .reduce((prev, errors) => ({
      ...prev,
      ...errors
    }), {} as FormErrors);
};
