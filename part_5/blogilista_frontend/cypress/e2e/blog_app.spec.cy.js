describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type('mluukkai')
      cy.get('input[name="Password"]').type('salainen')
      cy.get('button').click()
      cy.contains('mluukkai logged in')

    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('mluukkai')
      cy.get('input[name="Password"]').type('wrongpassword')
      cy.get('button').click()
      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input[name="Username"]').type('mluukkai')
      cy.get('input[name="Password"]').type('salainen')
      cy.get('button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('input[name="Author"]').type('Sani Letchu')
      cy.get('input[name="Title"]').type('FullStack')
      cy.get('input[name="Url"]').type('www.blog.com')
      cy.get('button[type=submit]').contains('create').click()
      cy.contains('a new blog FullStack by Sani Letchu added')
      cy.contains('FullStack Sani Letchu')
    })
  })

  describe('When a blog is created', function() {
    beforeEach(function async () {
      cy.get('input[name="Username"]').type('mluukkai')
      cy.get('input[name="Password"]').type('salainen')
      cy.get('button').click()
      cy.contains('create new blog').click()
      cy.get('input[name="Author"]').type('Sani Letchu')
      cy.get('input[name="Title"]').type('FullStack')
      cy.get('input[name="Url"]').type('www.blog.com')
      cy.get('button[type=submit]').contains('create').click()
      cy.contains('a new blog FullStack by Sani Letchu added')
      cy.contains('FullStack Sani Letchu')
    })

    it('Blog can be liked', function() {
      cy.get('button').contains('view').click()
      cy.contains('likes 0')
      cy.get('button').contains('like').click()
      cy.contains('likes 1')
    })

    it('Blog can be deleted', function() {
      cy.get('button').contains('view').click()
      cy.get('button').contains('remove').click()
      cy.get('html').should('not.contain', 'FullStack Sani Letchu')
    })

  })
  describe('Multiple blogs exist', () => {
    beforeEach(function async () {
      cy.get('input[name="Username"]').type('mluukkai')
      cy.get('input[name="Password"]').type('salainen')
      cy.get('button').click()
    })
    it('The blogs are sorted according to the likes', () => {
      cy.newBlog({
        title: 'fullstack1',
        author: 'Sani Letchu',
        url: 'wwww.blog.com',
        likes: 1
      })
      cy.newBlog({
        title: 'fullstack3',
        author: 'Sani Letchu',
        url: 'wwww.blog.com',
        likes: 3
      })
      cy.newBlog({
        title: 'fullstack2',
        author: 'Sani Letchu',
        url: 'wwww.blog.com',
        likes: 2
      })
      cy.get('.view').eq(0).click()
      cy.contains('likes 3')
      cy.get('.hide').eq(0).click()
      cy.get('.view').eq(1).click()
      cy.contains('likes 2')
      cy.get('.hide').eq(1).click()
      cy.get('.view').eq(2).click()
      cy.contains('likes 1')
      cy.get('.hide').eq(2).click()
    })
  })
})