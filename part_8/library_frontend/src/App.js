import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, gql, useSubscription } from '@apollo/client'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { ALL_BOOKS } from './components/Books'


export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
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

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&
          <button onClick={() => setPage('add')}>add book</button>
        }
        {!token &&
          <button onClick={() => setPage('login')}>login</button>
        }
        {token &&
          <button onClick={() => setPage('recommend')}>recommend</button>
        }
        {token &&
          <button onClick={logout}>logout</button>
        }
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommend show={page === 'recommend'} />

      <Login show={page === 'login'} setToken={setToken}/>
    </div>
  )
}

export default App
