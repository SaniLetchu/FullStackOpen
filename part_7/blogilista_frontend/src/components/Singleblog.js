import {
  useMatch
} from 'react-router-dom'
import blogService from '../services/blogs'

const Singleblog = ({ blogs, setBlogs, handleLike }) => {

  const handleNewComment = (event) => {
    event.preventDefault()
    blogService.createComment(blog.id, event.target.comment.value)
    event.target.comment.value = ''
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

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={`${blog.url}`}>{blog.url}</a>
      <p>{blog.likes} likes</p> <button onClick={() => handleLike(blog)}>like</button>
      <p>added by {blog.user.username}</p>
      <h3>comments</h3>
      <form onSubmit={handleNewComment}>
        <input name='comment'></input><button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Singleblog