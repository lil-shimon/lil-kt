import { Dispatch, FormEvent, SetStateAction, VFC } from 'react'
import { PresenterProps } from '../../../pages/lil-kt'

/**
 * KtPresenter
 * @param handleSubmit
 * @param todo
 * @param setTodo
 * @param data
 * @constructor
 */
export const KtPresenter: VFC<PresenterProps> = ({ handleSubmit, todo, setTodo, data }) => {
  return (
    <>
      <p>kt todo</p>
      <form onSubmit={handleSubmit}>
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
    </>
  )
}