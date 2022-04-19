import { FormEvent, useState, VFC } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { CreateTodoMutation, GetTodosQuery } from '../../../types/generated/graphql'
import { CREATE_TODO, GET_TODOS } from '../../../queries/queries'
import { Layout } from '../../Layout'
import { TodoStateType } from '../../../pages/lil-kt'
import { LilPresenter } from './LilPresenter'

/**
 * Kt Container
 * @constructor
 */
export const LilComponent: VFC = () => {

  const [todo, setTodo] = useState<TodoStateType>({ title: '', type: 1 })

  /**
   * Get Todos
   */
  const { data, error } = useQuery<GetTodosQuery>(GET_TODOS, {
    fetchPolicy: 'cache-and-network'
  })

  /**
   * Create a todo
   */
  const [insert_todos_one] = useMutation<CreateTodoMutation>(CREATE_TODO, {
    // @ts-ignore
    update(cache, { data: { insert_todos_one } }) {
      const cacheId = cache.identify(insert_todos_one)
      cache.modify({
        fields: {
          todos(prev, { toReference }) {
            // @ts-ignore
            return [toReference(cacheId), ...prev]
          }
        }
      })
    }
  })

  /**
   * Create Todo Function
   * @param e
   */
  const handleSummit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await insert_todos_one({
        variables: {
          title: todo.title,
          type: todo.type
        }
      })
    } catch ({ message }) {
      alert(message)
    }

    setTodo({title: "", type: 1})
  }

  if (error) return <Layout title={'lil-kt'}>Error: {error.message}</Layout>
  return <LilPresenter data={data} handleSubmit={handleSummit} setTodo={setTodo} todo={todo} />
}