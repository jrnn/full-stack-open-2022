import { CountryData } from "../types"

export const extractValues = <T, O extends Record<string, T> = Record<string, T>>(obj: O): Array<T> => {
  return !obj
    ? []
    : Object.keys(obj).map((key: keyof O) => obj[key])
}

export const sortCountriesByName = (p: CountryData, q: CountryData): number => {
  return p.name.localeCompare(q.name)
}
