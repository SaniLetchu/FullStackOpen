import { useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const apiKey = "dafc09f9b9b592b7846ce1fe1b1be6dc";

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  

  return (
    <div>
      find countries <input value={newFilter} onChange={handleFilter}></input>
      <Countries countries={countries} newFilter={newFilter} setNewFilter={setNewFilter} handleFilter={handleFilter}/>
    </div>
  )

}

export default App
