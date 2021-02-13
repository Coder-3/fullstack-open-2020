import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'

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

const Notification = ({ message }) => {
  if(message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ matchingPersons, setMatchingPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchedName, setSearchedName ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response)
    })
  }, [])

  const getPersonName = personId => {
    let thePerson
    persons.forEach(person => {
      if(person.id.toString() === personId) {
        thePerson = person.name
      }
    })
    return thePerson
  }

  const getPersonId = personName => {
    let thePersonId
    persons.forEach(person => {
      if(person.name === personName) {
        thePersonId = person.id
      }
    })
    return thePersonId
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if(persons.map(person => person.name).includes(newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personId = getPersonId(newName)
        personsService
        .updateNumber(personId, personObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== personId ? person : response))
          setSuccessMessage(`Updated ${newName}'s number`)
        })
      }
    } else {
      personsService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setSuccessMessage(`Added ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
      })
    }

    

    setNewName('')
    setNewNumber('')
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
      
      <Notification message={successMessage} />
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