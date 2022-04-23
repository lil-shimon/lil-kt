import { ChangeEvent, FormEvent, useState, useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { CreateUserMutation } from '../types/generated/graphql'
import { CREATE_USER } from '../queries/queries'

export const useCreateForm = () => {
  const [text, setText] = useState('')
  const [username, setUsername] = useState('')

  /**
   * for create user
   * cacheが自動的に更新されないので後処理が必要
   */
  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    // insert_users_one = 作ったユーザーの情報
    // @ts-ignore
    update(cache, { data: { insert_users_one } }) {
      const cacheId = cache.identify(insert_users_one)
      cache.modify({
        fields: {
          users(existingUsers, { toReference }) {
            // @ts-ignore
            return [toReference(cacheId), ...existingUsers]
          }
        }
      })
    }
  })

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const printMsg = useCallback(
    () => {
      console.log('hello')
    },
    []
  )


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await insert_users_one({
        variables: {
          name: username
        }
      })
    } catch ({ message }) {
      alert(message)
    }

    setUsername('')
  }

  return {
    text,
    handleSubmit,
    username,
    usernameChange,
    printMsg,
    handleTextChange
  }
}