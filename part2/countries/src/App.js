import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Country = ({ country, clickFunction }) => {
  return (
    <>
      <p>{country.name} <button onClick={clickFunction} id={country.name}>show</button></p>
    </>
  )
}

const FindCountries = ({ inputValue, changeFunction }) => {
  return (
    <div>find countries <input value={inputValue} onChange={changeFunction} /></div>
  )
}

const SingleCountry = ({ country }) => {
  const [ weather, setWeather ] = useState({})
  
  useEffect(() => { 
    axios
    .get('http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_API_KEY + '&query=' + country.name)
    .then(response => {
      setWeather(response.data.current)
    })
  }, [])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language =>
           <li key={language.name}>{language.name}</li>          
        )}
      </ul>
      <img src={country.flag} alt={country.name + " flag"} width="10%"/>
      <h3>Weather in {country.name}</h3>
      <p><strong>temperature: </strong>{weather.temperature} Celcius</p>
    </div>
  )
}

const App = () => {
  const [ countries, setCountry ] = useState([])
  const [ searchedCountry, setSearchedCountry ] = useState('')
  const [ matchingCountries, setMatchingCountries ] = useState([])

  const handleSearch = (event) => {
    setSearchedCountry(event.target.value)
    const allCountries = countries.map(country => country.name)
    const matchingCountries = allCountries.filter(country => country.toLowerCase().includes(searchedCountry.toLowerCase()))
    setMatchingCountries(matchingCountries)
  }

  const handleCountries = () => {
    if (!matchingCountries.length || searchedCountry === '') {
      return countries
    } else if (matchingCountries.length > 10) {
      return [{name: "Too many matches, specify another filter"}]
    } else {
      return countries.filter(country => matchingCountries.includes(country.name))
    }
  }
 
  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountry(response.data)
    })
  }, [])

  const showCountry = (event) => {
    setMatchingCountries(event.target.id)
  }
 
  if(matchingCountries.length === 1) {
    return (
      <div>
        <FindCountries inputValue={searchedCountry} changeFunction={handleSearch} />
        <SingleCountry country={handleCountries()[0]} />
      </div>
    )
  } else {
    return (
      <div>
        <FindCountries inputValue={searchedCountry} changeFunction={handleSearch} />
        {handleCountries().map(country => <Country key={country.name} country={country} clickFunction={showCountry} />)}
      </div>
    )
  }
}

export default App
