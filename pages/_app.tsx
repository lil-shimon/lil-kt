import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { initializeApollo } from '../lib/apolloClient'

/**
 * @param {AppProps} props
 * @returns
 */
function MyApp({ Component, pageProps }: AppProps) {
  // ApolloClient instance
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      {/* @ts-ignore*/}
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
