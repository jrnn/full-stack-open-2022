export interface ExternalCountryData {
  area: number
  capital?: Array<string>
  flags: {
    png: string
    svg: string
  }
  languages?: Record<string, string>
  name: {
    common: string
  }
  population: number
}

export interface CountryData {
  area: number
  capital: string
  flagUri: string
  languages: Array<string>
  name: string
  population: number
}
