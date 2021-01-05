import React, { useState } from 'react'

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ matchingPersons, setMatchingPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchedName, setSearchedName ] = useState('')

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
      <div>filter shown with <input value={searchedName} onChange={handleSearch} /></div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {displayNumbers().map(person =>
          <Person key={person.name} person={person} />
        )}
      </div>
    </div>
  )
}

export default App