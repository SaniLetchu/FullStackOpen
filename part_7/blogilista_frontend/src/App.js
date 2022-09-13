import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Users from './components/Users'
import Singleblog from './components/Singleblog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import {
  Routes, Route, Link
} from 'react-router-dom'
import Userblogs from './components/Userblogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStyle, setErrorStyle] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)

  const blogFormRef = useRef()


  const errorSt = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  const notification = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={errorMessage} errorStyle={errorStyle} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          {...{
            user,
            setBlogs,
            blogs,
            setErrorMessage,
            setErrorStyle,
            notification,
            errorSt,
            blogFormRef,
          }}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          handleLike={handleLike}
        />
      ))}
    </div>
  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      userService.getAll().then((users) =>
        setUsers(users))
      blogService.getAll().then((blogs) =>
        setBlogs(
          blogs.sort((a, b) => {
            if (a.likes < b.likes) {
              return 1
            }
            if (a.likes > b.likes) {
              return -1
            }
            return 0
          })
        )
      )
    }
  }, [Users])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.getAll().then((blogs) =>
        setBlogs(
          blogs.sort((a, b) => {
            if (a.likes < b.likes) {
              return 1
            }
            if (a.likes > b.likes) {
              return -1
            }
            return 0
          })
        )
      )
    } catch (exception) {
      setErrorStyle(errorSt)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleLike = async (blog) => {
    const likes = blog.likes + 1
    const newBlog = { ...blog, likes }
    await blogService.update(blog.id, newBlog)
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.sort((a, b) => {
          if (a.likes < b.likes) {
            return 1
          }
          if (a.likes > b.likes) {
            return -1
          }
          return 0
        })
      )
    )
  }

  return <div className='container'>{user === null ? loginForm() :
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} errorStyle={errorStyle} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Link to="/" >blogs</Link>
        <Link to='/users' >users</Link>
        <p>{user.username} logged in</p>
        <button onClick={handleLogout}> logout</button>
      </div>
      <Routes>
        <Route path="/" element={blogForm()} />
        <Route path="/blogs/:id" element={<Singleblog handleLike={handleLike} blogs={blogs} setBlogs={setBlogs}/>} />
        <Route path="/users/:id" element={<Userblogs users={users} setUsers={setUsers}/>} />
        <Route path="/users" element={<Users users={users} setUsers={setUsers}/>} />
      </Routes>
    </div>
  }
  </div>
}

export default App
