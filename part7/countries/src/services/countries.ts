import axios from "axios"
import { Country } from "../types"

export const fetchCountry = async (name: string): Promise<Country | undefined> => {
  if (name.trim()) {
    try {
      const uri = `https://restcountries.com/v3.1/name/${name.trim()}?fullText=true`
      const response = await axios.get<Array<Country>>(uri)
      return response.data[0]
    } catch (error) {
      return undefined
    }
  }
  return undefined
}
