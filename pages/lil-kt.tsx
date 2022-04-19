import { FormEvent, VFC, useState } from 'react'
import { Layout } from '../components/Layout'
import { useMutation, useQuery } from '@apollo/client'
import { CreateTodoMutation, GetTodosQuery } from '../types/generated/graphql'
import { CREATE_TODO, GET_TODOS } from '../queries/queries'

interface Todo {
  title: string
  type: number
}

const LilKt: VFC = () => {

  const [todo, setTodo] = useState<Todo>({ title: '', type: 1 })

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

  return (
    <Layout title={'lil-kt'}>
      <form onSubmit={handleSummit}>
        <input
          placeholder={'new todo'}
          type={'text'}
          value={todo.title}
          onChange={(e: { target: HTMLInputElement }) => {
            setTodo({ ...todo, title: e.target.value })
          }}
        />
        <button
          disabled={!todo.title}
          type={'submit'}
        >
          Add
        </button>
      </form>
      {data?.todos.map((todo) => {
        return (
          <div key={todo.id}>{todo.title}</div>
        )
      })}
    </Layout>
  )
}


export default LilKt