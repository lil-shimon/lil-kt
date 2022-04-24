/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect'
import { getPage, initTestHelpers } from 'next-page-tester'
import { setupServer } from 'msw/node'
import { handlers } from '../mock/handlers'
import { cleanup, render, screen } from '@testing-library/react'

initTestHelpers()
const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => {
  server.close()
})

describe('SSG Test Cases', () => {
  it('Should render the list of users by pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({
      route: '/hasura-ssg'
    })

    render(page)
    expect(await screen.findByText('SSG+ISR')).toBeInTheDocument()

    expect(await screen.findByText('Test user A')).toBeInTheDocument()
    expect(await screen.findByText('Test user B')).toBeInTheDocument()
    expect(await screen.findByText('Test user C')).toBeInTheDocument()
  })
})