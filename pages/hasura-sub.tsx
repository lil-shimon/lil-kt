import { VFC } from 'react'
import { Layout } from '../components/Layout'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GetUsersQuery } from '../types/generated/graphql'
import { GET_USERS_LOCAL } from '../queries/queries'

const FetchSub: VFC = () => {
  // cacheの値を読みに行く
  const { data } = useQuery<GetUsersQuery>(GET_USERS_LOCAL)
  return (
    <Layout title="Hasura FetchPolicy read cache">
      <p className="mb-6 font-bold">Direct read out from cache</p>
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-main">
        <a className="mt-6">Back</a>
      </Link>
    </Layout>
  )
}

export default FetchSub
