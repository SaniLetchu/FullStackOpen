import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const remove = async (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title}) by ${blog.author}`)) {

      await blogService.remove(blog.id)
      blogService.getAll().then(blogs =>
        setBlogs( blogs.sort((a, b) => {
          if(a.likes < b.likes) {
            return 1
          }
          if(a.likes > b.likes) {
            return -1
          }
          return 0
        }))
      )
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button className='view' onClick={() => setVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} {blog.author}<button className='hide' onClick={() => setVisible(false)}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>
          {blog.user.username}
        </div>
        <button onClick={remove}>remove</button>
      </div>
    </div>
  )}

export default Blog