import { gql, useQuery } from '@apollo/client'

const USER = gql`
query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    id
    title
    published
    genres
    author {
      name
      born
      bookCount
    }
  }
}
`

const Recommend = (props) => {

  const result = useQuery(ALL_BOOKS)
  const result1 = useQuery(USER)

  
  if (!props.show) {
    return null
  }
  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = result1.data.me.favoriteGenre === "all genres" ? [...(result.data.allBooks)] : [...(result.data.allBooks)].filter(book => book.genres.includes(result1.data.me.favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre <strong>{result1.data.me.favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
