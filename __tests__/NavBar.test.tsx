/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect'
import { getPage, initTestHelpers } from 'next-page-tester'
import { setupServer } from 'msw/node'
import { handlers } from '../mock/handlers'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

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

    // move to makevar page
    userEvent.click(screen.getByTestId('makevar-nav'))
    expect(await screen.findByText('makeVar')).toBeInTheDocument()

    // move to fetch policy
    userEvent.click(screen.getByTestId('fetchpolicy-nav'))
    expect(await screen.findByText('Hasura Main Page')).toBeInTheDocument()

    // move to hasura crud
    userEvent.click(screen.getByTestId('hasura-crud'))
    expect(await screen.findByText('Hasura CRUD')).toBeInTheDocument()
  })
})