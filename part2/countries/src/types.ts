export interface ExternalCountryData {
  area: number
  capital?: Array<string>
  capitalInfo: {
    latlng?: [ number, number ]
  }
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
  capitalCoordinates?: {
    latitude: number
    longitude: number
  }
  flagUri: string
  languages: Array<string>
  name: string
  population: number
}

export interface ExternalWeatherData {
  main: {
    temp: number
  }
  weather: [
    {
      icon: string
    }
  ]
  wind: {
    speed: number
  }
}

export interface WeatherData {
  iconUri: string
  temperatureInCelsius: number
  windMetersPerSecond: number
}
