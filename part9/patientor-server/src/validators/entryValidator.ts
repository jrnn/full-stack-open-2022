import { Entry, EntryDto, UnsafeEntryDto } from "../types";
import { isArray, validateNumber, validateString } from "./utils";

interface Discharge {
  date: string
  criteria: string
}

interface SickLeave {
  startDate: string
  endDate: string
}

const validateDischarge = (u?: unknown): Discharge => {
  if (!!u && typeof u === "object") {
    const { date, criteria } = u as Partial<Discharge>;
    return {
      date: validateString("date", date),
      criteria: validateString("criteria", criteria)
    };
  }
  throw new Error("Mandatory attribute 'discharge' is either missing or invalid.");
};

const validateSickLeave = (u?: unknown): SickLeave => {
  if (!!u && typeof u === "object") {
    const { startDate, endDate } = u as Partial<SickLeave>;
    return {
      startDate: validateString("startDate", startDate),
      endDate: validateString("endDate", endDate)
    };
  }
  throw new Error("Optional attribute 'sickLeave' is invalid.");
};

const validateEntryType = (value?: unknown): Entry["type"] => {
  switch (value) {
    case "Hospital":
    case "OccupationalHealthcare":
    case "HealthCheck":
      return value;
    default:
      throw new Error("Mandatory attribute 'type' is either missing or invalid. "
        + "Must be one of: 'Hospital', 'OccupationalHealthcare', 'HealthCheck'");
  }
};

export const toEntryDto = (dto: UnsafeEntryDto): EntryDto => {
  const type = validateEntryType(dto.type);
  const { date, description, diagnosisCodes, specialist } = dto;
  const entryBase = {
    date: validateString("date", date),
    specialist: validateString("specialist", specialist),
    description: validateString("description", description),
    diagnosisCodes: isArray(diagnosisCodes)
      ? diagnosisCodes.map(u => validateString("diagnosisCodes", u))
      : []
  };
  switch (type) {
    case "Hospital": {
      const { discharge } = dto;
      return {
        ...entryBase,
        type: "Hospital",
        discharge: validateDischarge(discharge)
      };
    }
    case "OccupationalHealthcare": {
      const { employerName, sickLeave } = dto;
      if (sickLeave) {
        return {
          ...entryBase,
          type: "OccupationalHealthcare",
          employerName: validateString("employerName", employerName),
          sickLeave: validateSickLeave(sickLeave)
        };
      }
      return {
        ...entryBase,
        type: "OccupationalHealthcare",
        employerName: validateString("employerName", employerName)
      };
    }
    case "HealthCheck": {
      const { healthCheckRating } = dto;
      return {
        ...entryBase,
        type: "HealthCheck",
        healthCheckRating: validateNumber("healthCheckRating", healthCheckRating)
      };
    }
    default:
      throw new Error("Somehow an unknown type slipped through. This should not be possible.");
  }
};
