import { ChangeEvent, FormEvent, useState, VFC } from 'react'
import { Reference, StoreObject, useMutation, useQuery } from '@apollo/client'
import { CREATE_USER, DELETE_USER, GET_USERS, UPDATE_USER } from '../queries/queries'
import { CreateUserMutation, DeleteUserMutation, GetUsersQuery, UpdateUserMutation } from '../types/generated/graphql'
import { Layout } from '../components/Layout'
import { UserItem } from '../components/UserItem'

/**
 * @constructor
 */
const HasuraCRUD: VFC = () => {
  const [editedUser, setEditedUser] = useState({ id: '', name: '' })

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
  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
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

  /**
   * update or create
   * @param e {FormEvent}
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedUser.id) {
      try {
        await update_users_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name
          }
        })
      } catch ({ message }) {
        alert(message)
      }
      setEditedUser({ id: '', name: '' })
    } else {
      try {
        await insert_users_one({
          variables: {
            name: editedUser.name
          }
        })
      } catch ({ message }) {
        alert(message)
      }
      setEditedUser({ id: '', name: '' })
    }
  }

  if (error) return <Layout title={'Hasura CRUD'}>Error: {error.message}</Layout>

  return (
    <Layout title={'Hasura CRUD'}>
      <p className={'mb-3 font-bold'}>Hasura CRUD</p>
      <form
        className={'flex flex-col justify-center items-center'}
        onSubmit={handleSubmit}
      >
        <input
          className={'px-3 py-2 border border-gray-300'}
          placeholder={'New user ?'}
          type={'text'}
          value={editedUser.name}
          onChange={(e: { target: HTMLInputElement }) => {
            setEditedUser({ ...editedUser, name: e.target.value })
          }}
        />
        <button
          disabled={!editedUser.name}
          className={'disabled:opacity-40 my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none'}
          data-testid={'new'}
          type={'submit'}
        >
          {editedUser.id ? 'Update' : 'Create'}
        </button>
      </form>
      {data?.users.map((user) => {
        return (
          <UserItem key={user.id} user={user} delete_users_by_pk={delete_users_by_pk} setEditedUser={setEditedUser} />
        )
      })}
    </Layout>
  )
}

export default HasuraCRUD