import { useState, useEffect } from "react"
import { gql, useMutation } from '@apollo/client'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const Login = (props) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN)

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    login({  variables: { username: name, password } })
    setPassword('')
    setName('')
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
