import {
  VFC, useState, FormEvent
} from 'react'
import { useQuery, useMutation, Reference, StoreObject } from '@apollo/client'
import { GET_USERS, CREATE_USER, DELETE_USER, UPDATE_USER } from '../queries/queries'
import { GetUsersQuery, CreateUserMutation, UpdateUserMutation, DeleteUserMutation } from '../types/generated/graphql'
import { Layout } from '../components/Layout'

/**
 * @constructor
 */
const HasuraCRUD: VFC = () => {

  /**
   * Get Users
   */
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network'
  })

  /**
   * for update user
   * updateはキャッシュが作成されるので後処理不要
   */
  const [update_users_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER)

  /**
   * for create user
   * cacheが自動的に更新されないので後処理が必要
   */
  const [insert_users_by_pk] = useMutation<CreateUserMutation>(CREATE_USER, {
    // insert_users_one = 作ったユーザーの情報
    update(cache, { data: { insert_users_one } }) {
      const cacheId = cache.identify(insert_users_one)
      cache.modify({
        fields: {
          users(existingUsers, { toReference }) {
            return [toReference(cacheId), ...existingUsers]
          }
        }
      })
    }
  })

  /**
   * for deleting user
   * cacheが自動的に作成されないので後処理が必要
   */
  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    update(cache, { data: { delete_users_by_pk } }) {
      cache.modify({
        fields: {
          users(existingUsers, { readField }) {
            return existingUsers.filter(
              (user: Reference | StoreObject | undefined) => {
                return delete_users_by_pk.id !== readField('id', user)
              }
            )
          }
        }
      })
    }
  })

  return (
    <Layout title={'Hasura CRUD'}>
      <p className={'mb-3 font-bold'}>Hasura CRUD</p>
    </Layout>
  )
}

export default HasuraCRUD