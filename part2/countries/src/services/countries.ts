import axios from "axios";
import { CountryData, ExternalCountryData } from "../types";
import { extractValues } from "../utils";

const API_URI = "https://restcountries.com/v3.1/all"

const toCountryData = (data: ExternalCountryData): CountryData => {
  const capital = (!!data.capital && data.capital[0])
    ? data.capital[0]
    : "N/A"

  const languages = !data.languages
    ? []
    : extractValues<string>(data.languages)

  return {
    area: data.area,
    capital,
    flagUri: data.flags.png,
    languages,
    name: data.name.common,
    population: data.population
  }
}

export const getCountries = (): Promise<Array<CountryData>> => {
  return axios
    .get<Array<ExternalCountryData>>(API_URI)
    .then(({ data }) => data.map(toCountryData))
}
