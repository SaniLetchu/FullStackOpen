const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Sani Letchu',
    url: 'www.devblog.com/SaniLetchu',
    likes: 3,
  },
  {
    title: 'Dev journey',
    author: 'Athene',
    url: 'www.devblog.com/Athene',
    likes: 300,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  usersInDb,
  blogsInDb,
}
