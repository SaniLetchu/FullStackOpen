const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach((blog) => {
    likes += blog.likes
  })
  return likes
}

const favoriteBlog = (blogs) => {
  let mostLikes = blogs[0]
  blogs.forEach((blog) => {
    if (mostLikes.likes < blog.likes) {
      mostLikes = blog
    }
  })
  return mostLikes
}

const mostBlogs = (blogs) => {
  const nameOfAuthor = (blog) => {
    return blog.author
  }
  const lengthOfArray = (array) => {
    return array[1].length
  }
  const groupByAuthor = Object.entries(_.groupBy(blogs, nameOfAuthor))
  const authorWithMostBlogs = _.maxBy(groupByAuthor, lengthOfArray)
  return {
    author: authorWithMostBlogs[0],
    blogs: authorWithMostBlogs[1].length,
  }
}

const mostLikes = (blogs) => {
  const nameOfAuthor = (blog) => {
    return blog.author
  }
  const sumOfLikes = (array) => {
    const likes = (object) => object.likes
    return _.sumBy(array[1], likes)
  }
  const groupByAuthor = Object.entries(_.groupBy(blogs, nameOfAuthor))
  const authorWithMostBlogs = _.maxBy(groupByAuthor, sumOfLikes)
  return {
    author: authorWithMostBlogs[0],
    likes: sumOfLikes(authorWithMostBlogs),
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
