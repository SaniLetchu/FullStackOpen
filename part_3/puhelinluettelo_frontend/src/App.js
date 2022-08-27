import { useState, useEffect} from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStyle, setErrorStyle] = useState({})

  const errorSt = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  const notification = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.some(person => person.name === newName)) {
      const currentPersonObject = persons.find(person => person.name === newName)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
        .update(currentPersonObject.id, personObject)
        .then(() =>
          personService
          .getAll()
          .then(initialPersons => {
          setPersons(initialPersons)
          setErrorStyle(notification)
          setErrorMessage(
            `Number has been replaced for ${currentPersonObject.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
        )
        .catch(error => {
          setErrorStyle(errorSt)
          setErrorMessage(
            error.response.data.error
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
      }
    }
    else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setErrorStyle(notification)
        setErrorMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrorStyle(errorSt)
        setErrorMessage(
          error.response.data.error
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }
  }

  const handleDelete = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)) {
      personService
      .remove(person.id)
      .then(() =>
        personService
        .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
        setErrorStyle(notification)
        setErrorMessage(
          `Deleted ${person.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
      )
      .catch(() => {
        setErrorStyle(errorSt)
        setErrorMessage(
          `Information of ${person.name} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
      })
    }
  }

  const handleFormNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleFormNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = newFilter.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()) === true)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} errorStyle={errorStyle}/>
      <Filter handleFilter={handleFilter} newFilter={newFilter} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} newNumber={newNumber} 
        handleFormNameChange={handleFormNameChange}
        handleFormNumberChange={handleFormNumberChange} 
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )

}

export default App