/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect'
import { getPage, initTestHelpers } from 'next-page-tester'
import { setupServer } from 'msw/node'
import { handlers } from '../mock/handlers'
import { cleanup, render, screen } from '@testing-library/react'

initTestHelpers()

// mock server
const server = setupServer(...handlers)

// run server
beforeAll(() => {
  server.listen()
})

// finish each test, reset server
afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => {
  server.close()
})

describe('Navigation Test Cases', () => {
  it('Should route to selected page in navbar', async () => {
    const {page} = await getPage({
      route: '/'
    })
    render(page)
    expect(await screen.findByText('Next.js + GraphQL')).toBeInTheDocument()
  })
})