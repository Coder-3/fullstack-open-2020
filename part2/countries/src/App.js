import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Country = ({ country }) => <p>{country.name}</p>

const FindCountries = ({ inputValue, changeFunction }) => {
  return (
    <div>find countries <input value={inputValue} onChange={changeFunction} /></div>
  )
}

const SingleCountry = ({ country }) => {
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
        {handleCountries().map(country => <Country key={country.name} country={country} />)}
      </div>
    )
  }
}

export default App
