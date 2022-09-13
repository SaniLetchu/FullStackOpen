import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Only the first div is visible initially, which contains title and author', () => {
  const blog = {
    title: 'FullStack',
    author: 'Sani Letchu',
    url: 'www.blog.com',
    user: {
      username: 'admin',
    },
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  const child1 = div.firstElementChild
  const child2 = div.lastElementChild
  expect(child1).toHaveStyle('display: block')
  expect(child2).toHaveStyle('display: none')
})

test('Clicking the button called view makes the other div visible', async () => {
  const blog = {
    title: 'FullStack',
    author: 'Sani Letchu',
    url: 'www.blog.com',
    user: {
      username: 'admin',
    },
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.blog')
  const child1 = div.firstElementChild
  const child2 = div.lastElementChild
  expect(child1).toHaveStyle('display: none')
  expect(child2).toHaveStyle('display: block')
})

test('Event handler is called twice for handleLike if like button is clicked twice', async () => {
  const blog = {
    title: 'FullStack',
    author: 'Sani Letchu',
    url: 'www.blog.com',
    user: {
      username: 'admin',
    },
  }

  const mockHandler = jest.fn()

  const container = render(<Blog blog={blog} handleLike={mockHandler} />)

  //Make the like button visible
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  //Click the like button two times
  const button1 = container.getByText('like')
  await user.click(button1)
  await user.click(button1)

  expect(mockHandler.mock.calls.length).toBe(2)
})
