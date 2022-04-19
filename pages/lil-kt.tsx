import { Dispatch, SetStateAction, VFC } from 'react'
import { Layout } from '../components/Layout'
import { KtComponent } from '../components/lilkt/kt/Kt'
import { GetTodosQuery } from '../types/generated/graphql'
import { LilComponent } from '../components/lilkt/lil/Lil'

export interface PresenterProps {
  data: GetTodosQuery | undefined
  handleSubmit: any
  setTodo: Dispatch<SetStateAction<TodoStateType>>
  todo: TodoStateType
}

/**
 * Type for todo state management
 */
export interface TodoStateType {
  title: string
  type: number
}

const LilKt: VFC = () => {

  return (
    <Layout title={'lil-kt'}>
      <div>
        <LilComponent />
        <KtComponent />
      </div>
    </Layout>
  )
}


export default LilKt