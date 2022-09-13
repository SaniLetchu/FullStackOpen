import {
  useMatch
} from 'react-router-dom'
import userService from '../services/users'
import { useEffect } from 'react'

const Userblogs = ({ setUsers }) => {

  let user = null
  const match = useMatch('/users/:id')

  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
      user = match
        ? users.find(user => user.id === match.params.id)
        : null
    })
  }, [ useMatch])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Userblogs
