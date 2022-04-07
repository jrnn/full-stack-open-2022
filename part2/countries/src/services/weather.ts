import axios from "axios"
import { ExternalWeatherData, WeatherData } from "../types"

const API_URI = "https://api.openweathermap.org/data/2.5/weather"
const API_KEY = process.env["WEATHER_API_KEY"]

const toWeatherData = (data: ExternalWeatherData): WeatherData => {
  return {
    iconUri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    temperatureInCelsius: data.main.temp,
    windMetersPerSecond: data.wind.speed
  }
}

export const getWeatherData = (latitude: number, longtitude: number): Promise<WeatherData> => {
  return axios
    .get<ExternalWeatherData>(`${API_URI}?lat=${latitude}&lon=${longtitude}&units=metric&appid=${API_KEY}`)
    .then(({ data }) => toWeatherData(data))
}
