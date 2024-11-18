import { useState, useEffect } from 'react'
import Numbers from './Numbers'
import axios from 'axios'
import numberService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [filterPersons, setFilterPersons] = useState(false)

  const hook = () => {
    numberService
     .getAll()
     .then(initialNumbers => {
      setPersons(initialNumbers)
     })
  }

  useEffect(hook, [])


  const addPerson = (event) => {
    event.preventDefault()
    // Check if name is already in the list
    const found = persons.find((element) => element.name == newName)
    console.log(found)
    if (found != undefined) {
      if (window.confirm(`${newName} is already in the list. Update number with new number?`)) {
        const update_obj = {
          ...found,
          number : newNumber
        }

        numberService.update(found.id, update_obj)
        // Can add code here to auto update the list
      }

      return
    }
    // Add
    const person_obj = {
      name: newName,
      number: newNumber
    }
    numberService
     .create(person_obj)
     .then(returnedNumber => {
      setPersons(persons.concat(returnedNumber))
      setNewNumber('')
     })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    if (event.target.value.trim().length === 0) {
      setFilterPersons(false)
      console.log('a')
    }else {
      setFilterPersons(true)
      console.log('aa')
    }
    setNameFilter(event.target.value)
    
    // Update the list of names to show
    const namesToShow = persons.filter((obj) => obj.name.includes(event.target.value))
    setPersonsToShow(namesToShow)
    console.log(namesToShow)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Filter by Name: <input 
          value={nameFilter}
          onChange={handleFilterChange}/>
        </div>
      </form>
      <h2>Add a New Person</h2>
      <form>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number : <input 
          value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button
          type="submit"
          onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers names={filterPersons ? personsToShow : persons}/>
    </div>
  )
}

export default App
