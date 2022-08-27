const Persons = ({ personsToShow, handleDelete }) => {
  return (
    personsToShow.map(person =>
      <div style={{display: "flex", alignItems: "center", gap: "5px"}} key={person.id}><p key={person.name}>{person.name} {person.number}</p><button onClick={() => handleDelete(person)}>delete</button></div>
    )
  )
}

export default Persons