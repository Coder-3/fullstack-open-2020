import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

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

const Person = ({ person, onClickFunction }) => {
  return (
    <>
      <p>{person.name} {person.number}</p>
      <button onClick={onClickFunction} id={person.id}>delete</button>
    </>
  )
}

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ matchingPersons, setMatchingPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchedName, setSearchedName ] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
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
      personsService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
      })
    }

    setNewName('')
    setNewNumber('')
  }
  
  const getPersonName = (personId) => {
    let thePerson
    persons.forEach(person => {
      if(person.id.toString() === personId) {
        thePerson = person.name
      }
    })

    return thePerson
  }

  const deletePerson = event => {
    const personName = getPersonName(event.target.id)
    if(window.confirm(`Delete ${personName} ?`)) {
      personsService
      .deletePerson(event.target.id)
      .then(response => {
        personsService
        .getAll()
        .then(response => {
          setPersons(response)
        })
      })
    }
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
          <Person key={person.id} person={person} onClickFunction={deletePerson} />
        )}
    </div>
  )
}

export default App