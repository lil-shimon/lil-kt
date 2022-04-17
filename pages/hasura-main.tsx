import { VFC } from 'react'

import { useQuery } from '@apollo/client'
import Link from 'next/link'

import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const FetchMain: VFC = () => {
  const { data, error, loading } = useQuery<GetUsersQuery>(GET_USERS)

  if (loading)
    return (
      <Layout title="Hasura FetchPolicy">
        <p>Loading...</p>
      </Layout>
    )

  if (error)
    return (
      <Layout title="Hasura FetchPolicy">
        <p>Error {error.message}</p>
      </Layout>
    )

  return (
    <Layout title="Hasura FetchPolicy">
      <p className="mb-6 font-bold">Hasura Main Page</p>
      {console.log('data', data)}
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}

      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  )
}

export default FetchMain
