import React, { FunctionComponent, useEffect, useState } from "react"
import { getWeatherData } from "../services/weather"
import { WeatherData } from "../types"

interface Props {
  capital: string
  coordinates: {
    latitude: number
    longitude: number
  }
}

const WeatherReport: FunctionComponent<Props> = ({ capital, coordinates }) => {
  const [ weather, setWeather ] = useState<WeatherData>()

  useEffect(() => {
    const { latitude, longitude } = coordinates
    getWeatherData(latitude, longitude)
      .then(setWeather)
      .catch(error => console.error(error))
  }, [ coordinates ])

  if (!weather) {
    return <p>(Trying to fetch weather data ...)</p>
  }
  return (
    <>
      <h4>Weather in {capital}</h4>
      <p>Temperature {weather.temperatureInCelsius} C</p>
      <img src={weather.iconUri} />
      <p>Wind speed {weather.windMetersPerSecond} m/s</p>
    </>
  )
}

export default WeatherReport
