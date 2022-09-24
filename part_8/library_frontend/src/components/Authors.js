import { gql, useQuery, useMutation } from '@apollo/client'
import Select from 'react-select';
import { useState } from 'react'

export const ALL_PERSONS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!
    $born: Int!
  ) {
    editAuthor(
      name: $name
      setBornTo: $born
    ) {
      name
      id
      born
    }
  }
`

const Authors = (props) => {
  const result = useQuery(ALL_PERSONS)
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_PERSONS } ]
  })

  const submit = async (event) => {
    event.preventDefault()
  
    editAuthor({  variables: { name: name.value, born: Number(born) } })
    setName('')
    setBorn('')
    
  }

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }
  const authors = [...(result.data.allAuthors)]

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          value={name}
          onChange={setName}
          options={authors.map((author) => ({value: author.name, label: author.name}))}
        />
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
    
       
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
