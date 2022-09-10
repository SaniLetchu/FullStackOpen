import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ user, setBlogs, blogs, setErrorMessage, setErrorStyle, notification, errorSt, blogFormRef }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async event => {
    event.preventDefault()
    try {
      const blogObject = {
        user: user,
        title: title,
        author: author,
        url: url
      }
      blogFormRef.current.toggleVisibility()
      blogService.create(blogObject).then(blog => {
        setBlogs(blogs.concat(blog))
        setAuthor('')
        setTitle('')
        setUrl('')
        setErrorStyle(notification)
        setErrorMessage(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
      })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorStyle(errorSt)
      setErrorMessage('Failed creating a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div>
          title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
          author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
          url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm