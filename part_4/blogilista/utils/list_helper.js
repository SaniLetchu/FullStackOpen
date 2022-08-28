const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach(blog => {
    likes += blog.likes
  })
  return likes
}

const favoriteBlog = (blogs) => {
  let mostLikes = blogs[0]
  blogs.forEach(blog => {
    if(mostLikes.likes < blog.likes) {
      mostLikes = blog
    }
  })
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}