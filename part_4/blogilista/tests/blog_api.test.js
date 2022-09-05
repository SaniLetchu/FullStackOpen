const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let headers

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('password', 10)
  const admin = new User({
    username: 'admin',
    name: 'admin',
    blogs: [],
    passwordHash
  })

  await admin.save()
  let blogObject = new Blog({ ...helper.initialBlogs[0], user: admin._id })
  await blogObject.save()

  blogObject = new Blog({ ...helper.initialBlogs[1], user: admin._id })
  await blogObject.save()
  const user = {
    username: 'admin',
    password: 'password'
  }

  const loginUser = await api
    .post('/api/login')
    .send(user)

  headers = {
    'Authorization': `bearer ${loginUser.body.token}`
  }
})

test('There are correct amount of JSON blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .set(headers)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('Every returned blog has identifying id', async () => {
  const response = await api
    .get('/api/blogs')
    .set(headers)
    .expect('Content-Type', /application\/json/)

  expect(response.body[0].id).toBeDefined()
  expect(response.body[1].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'CSS is easy',
    author: 'Sani Letchu',
    url: 'www.devblog.com/SaniLetchu',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set(headers)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'CSS is easy'
  )
})

test('a blog without likes can also be added, which defaults likes to 0', async () => {
  const newBlog = {
    title: 'I should have 0 likes',
    author: 'Sani Letchu',
    url: 'www.devblog.com/SaniLetchu'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set(headers)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'I should have 0 likes'
  )
  const likes = blogsAtEnd.map(b => b.likes)
  expect(likes).toContain(
    0
  )
})

test('blog without title and url is not added', async () => {
  const newBlog = {
    author: 'Sani Letchu',
    likes: 100
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set(headers)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('deletion succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set(headers)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(b => b.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('update existing blog successfully', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = { ...blogToUpdate, likes: 123 }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .set(headers)

  const blogsAtEnd = await helper.blogsInDb()

  const likes = blogsAtEnd.map(b => b.likes)

  expect(likes).not.toContain(3)
  expect(likes).toContain(123)
})

afterAll(() => {
  mongoose.connection.close()
})