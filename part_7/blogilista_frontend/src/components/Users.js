import { Link } from 'react-router-dom'
import userService from '../services/users'
import { useEffect } from 'react'
import Table from 'react-bootstrap/Table'

const Users = ({ users, setUsers }) => {

  useEffect(() => {
    userService.getAll().then((users) =>
      setUsers(users))
  }, [])

  if (!users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
