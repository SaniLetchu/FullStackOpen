import axios from 'axios'
import { useState } from 'react'

const apiKey = process.env.REACT_APP_API_KEY;



const Countries = ({ countries, newFilter, setNewFilter, handleFilter }) => {
  
  const [temperature, setTemperature] = useState(-3.73)
  const [wind, setWind] = useState(1.34)
  const [weather, setNewWeather] = useState('http://openweathermap.org/img/wn/10d@2x.png')
  
  const countriesToShow = newFilter.length === 0
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()) === true)

  if(countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if(countriesToShow.length === 0) {
    return (
      <div>
        No matches for this filter
      </div>
    )
  }
  else if(countriesToShow.length === 1) {
    const country = countriesToShow[0]
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${apiKey}`)
      .then(response => {
        setWind(response.data.wind.speed)
        setTemperature(response.data.main.temp)
        setNewWeather(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
      })
    const languages = Object.keys(country.languages).map(language =>
      <li key={language}>{country.languages[language]}</li> 
      )
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {languages}
        </ul>
        <img src={country.flags.png} alt="Country flag"></img>
        <h2>Weather in {country.capital}</h2>
        <p>temperature {(temperature -272.15).toFixed(2)} Celcius </p>
        <img src={weather} alt="Weather icon"></img>
        <p>wind {wind} m/s</p>
      </div>
    )
  }
  else {
    return (
      [
        countriesToShow.map(country => 
          <div key={country.name.common} style={{display: "flex", alignItems: "center", gap: "5px"}}><p key={country.name}>{country.name.common}</p><button key={country.idd.root} value={country.name.common} onClick={handleFilter}>show</button></div>)
        
      ])
  
  }
}

export default Countries
