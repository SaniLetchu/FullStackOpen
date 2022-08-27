const PersonForm = ({ addPerson, newName, handleFormNameChange, handleFormNumberChange, newNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleFormNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} type="tel" onChange={handleFormNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm