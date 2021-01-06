import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Filter = ({ inputValue, changeFunction }) => {
  return (
    <div>filter shown with <input value={inputValue} onChange={changeFunction}></input></div>
  )
}

const PersonForm = ({ onSubmit, nameValue, nameChange, numberValue, numberChange }) => {
  return (
    <div>
       <form onSubmit={onSubmit}>
       <div>name: <input value={nameValue} onChange={nameChange} /></div>
        <div>number: <input value={numberValue} onChange={numberChange} /></div>
        <div><button type="submit">add</button></div>
       </form>
    </div>
  )
}

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const App = () => {

  const [ persons, setPersons ] = useState([])

  // const [ persons, setPersons ] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  const [ matchingPersons, setMatchingPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchedName, setSearchedName ] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if(persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchedName(event.target.value);
    const allPersons = persons.map(person => person.name)
    const matchingPersons = allPersons.filter(person => person.toLowerCase().includes(searchedName.toLowerCase()))
    setMatchingPersons(matchingPersons)
  }

  const displayNumbers = () => {
    if(!matchingPersons.length || searchedName === '') {
      return persons
    } else {
      return persons.filter(person => matchingPersons.includes(person.name))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter inputValue={searchedName} changeFunction={handleSearch} />
      
      <h2>add a new</h2>
      
      <PersonForm
        onSubmit={addPerson} nameValue={newName} nameChange={handleNameChange}
        numberValue={newNumber} numberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

        {displayNumbers().map(person =>
          <Person key={person.name} person={person} />
        )}
    </div>
  )
}

export default App