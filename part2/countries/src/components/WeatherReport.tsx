import React, { FunctionComponent, useEffect, useState } from "react"
import { getWeatherData } from "../services/weather"
import { CountryData, WeatherData } from "../types"

interface Props {
  country: CountryData
}

const WeatherReport: FunctionComponent<Props> = ({ country }) => {
  const { capital, capitalCoordinates } = country

  if (!capital || !capitalCoordinates) {
    return null
  }
  const [ weather, setWeather ] = useState<WeatherData>()

  useEffect(() => {
    const { latitude, longitude } = capitalCoordinates
    getWeatherData(latitude, longitude)
      .then(setWeather)
      .catch(error => console.error(error))
  }, [])

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
