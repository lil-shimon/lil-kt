import { gql } from '@apollo/client'

// ユーザーを新しい順に取得する (server side)
export const GET_USERS = gql`
  query GetUsers {
    users(order_by: { created_at: asc }) {
      name
      id
      created_at
    }
  }
`

// cacheからユーザーを新しい情報を取得する (client side)
// export const GET_USERS_LOCAL = gql`
//   query GetUsers {
//     users(order_by: { created_at: asc }) @client {
//       name
//       id
//       created_at
//     }
//   }
// `

// ユーザーIDを新しい順に取得する
export const GET_USERIDS = gql`
  query GetUserIds {
    users(order_by: { created_at: desc }) {
      id
    }
  }
`

/**
 * ユーザーIDでユーザーを取得する
 * @param {uuid} id
 */
export const GET_USERBY_ID = gql`
  query GetUserById($id: uuid!) {
    users_by_pk(id: $id) {
      id
      name
      created_at
    }
  }
`

/**
 * 新しくユーザーを作成する
 * @param {string} name
 */
export const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    insert_users_one(object: { name: $name }) {
      created_at
      id
      name
    }
  }
`

/**
 * ユーザーを更新する
 * @param {uuid} id
 * @param {string} name
 */
export const UPDATE_USER = gql`
  mutation UpdateUser($id: uuid!, $name: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      name
      created_at
      id
    }
  }
`

/**
 * ユーザーを削除する
 * @param {uuid} id ユーザーID
 */
export const DELETE_USER = gql`
  mutation DeleteUser($id: uuid!) {
    delete_users_by_pk(id: $id) {
      id
      name
      created_at
    }
  }
`

/**
 * Get All Todo
 */
export const GET_TODOS = gql`
  query GetTodos {
      todos {
        created_at
        id
        title
        type
      }
  }
`

/**
 * Create a todo
 */
export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $type: Int!) {
    insert_todos_one(object: { title: $title, type: $type }) {
      created_at
      id
      title
      type
    }
  }
`