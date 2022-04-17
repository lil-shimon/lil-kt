import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

import 'cross-fetch/polyfill'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

/**
 * @returns {ApolloClient<NormalizedCacheObject>}
 */
const createApolloClient = () => {
  return new ApolloClient({
    // ブラウザじゃない場合はtrue. (serverで実行されている場合)
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://humane-octopus-91.hasura.app/v1/graphql',
    }),

    cache: new InMemoryCache(),
  })
}

/**
 * @param initialState
 * @returns ApolloClient<NormalizedCacheObject>
 */
export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()

  // for ssg and ssr always create a new client
  // SSGとSSRは毎回ApolloClientインスタンスを作り直さないといけない
  if (typeof window === 'undefined') return _apolloClient

  // create the apollo client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
