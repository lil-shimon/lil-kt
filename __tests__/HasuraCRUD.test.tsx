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

describe('Hasura CRUD Test Cases', () => {
  it('Should render the list of users by useQuery', async () => {
    const { page } = await getPage({
      route: '/hasura-crud'
    })

    render(page)
    expect(await screen.findByText('Hasura CRUD')).toBeInTheDocument()

    // for user A
    expect(await screen.findByText('Test user A')).toBeInTheDocument()
    expect(await screen.findByText('2022-01-13T18:06:46.412969+00:00')).toBeInTheDocument()
    expect(await screen.getByTestId('edit-b6137849-7f1d-c2db-e609-22056fb86db3')).toBeTruthy()
    expect(await screen.getByTestId('delete-b6137849-7f1d-c2db-e609-22056fb86db3')).toBeTruthy()

    // for user B
    expect(await screen.findByText('Test user B')).toBeInTheDocument()
    expect(await screen.findByText('2022-02-13T18:06:46.412969+00:00')).toBeInTheDocument()
    expect(await screen.getByTestId('edit-2b07950f-9959-1bc7-834d-5656e4aeaac2')).toBeTruthy()
    expect(await screen.getByTestId('delete-2b07950f-9959-1bc7-834d-5656e4aeaac2')).toBeTruthy()

    // for user C
    expect(await screen.findByText('Test user C')).toBeInTheDocument()
    expect(await screen.findByText('2022-03-13T18:06:46.412969+00:00')).toBeInTheDocument()
    expect(await screen.getByTestId('edit-7fe58619-10ec-5239-6f43-1da15a634aba')).toBeTruthy()
    expect(await screen.getByTestId('delete-7fe58619-10ec-5239-6f43-1da15a634aba')).toBeTruthy()
  })
})