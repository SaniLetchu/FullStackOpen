import { gql, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react';
import Select from 'react-select';

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

const Books = (props) => {
  const [genre, setGenre] = useState({value: "all genres"})
  const [genreList, setGenreList] = useState([])
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if ( result.data ) {
      const genres = [].concat.apply([], result.data.allBooks.map(book => book.genres))
      let uniquegenres = genres.filter((element, index) => {
        return genres.indexOf(element) === index
      })
      setGenreList([])
      for (const genree of uniquegenres) {
        if(!genreList.includes(genree))
          setGenreList(oldArray => [...oldArray, genree])
      }
      setGenreList(oldArray => [...oldArray, "all genres"])
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }
  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = genre.value === "all genres" ? [...(result.data.allBooks)] : [...(result.data.allBooks)].filter(book => book.genres.includes(genre.value))

  return (
    <div>
      <h2>books</h2>

      <p>in genre <strong>{genre.value}</strong></p>

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
      <Select
          placeholder={genre.value}
          value={genre.value}
          onChange={setGenre}
          options={genreList.map((genre) => ({value: genre, label: genre}))}
        />
    </div>
  )
}

export default Books
