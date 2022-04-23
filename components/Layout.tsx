import { ReactNode, VFC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import image from 'next/image'

interface Props {
  children: ReactNode
  title: string
}

export const Layout: VFC<Props> = ({
  children,
  title = 'Welcome to Nextjs',
}) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-gray-600 text-sm font-mono">
      <Head>
        <title>{title}</title>
      </Head>

      <header className="bg-gray-800 w-screen">
        <nav className="flex items-center pl-8 h-14">
          <div className="flex spave-x-4">
            <Link href="/">
              <a
                // for test
                data-testid="home-nav"
                className="test-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
              >
                Home
              </a>
            </Link>

            <Link href="/local-state-a">
              <a
                data-testid="makevar-nav"
                className="test-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
              >
                makeVar
              </a>
            </Link>

            <Link href="/hasura-main">
              <a
                data-testid="fetchpolicy-nav"
                className="test-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
              >
                FetchPolicy(Hasura)
              </a>
            </Link>

            <Link href="/hasura-crud">
              <a
                data-testid="hasura-crud"
                className="test-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
              >
                CRUD(Hasura)
              </a>
            </Link>

            <Link href="/hasura-ssg">
              <a
                data-testid="ssg-nav"
                className="test-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
              >
                SSG+ISR(Hasura)
              </a>
            </Link>

            <Link href="/hooks-memo">
              <a
                data-testid="memo-nav"
                className="test-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
              >
                customHooks+memo
              </a>
            </Link>

            <Link href="/lil-kt">
              <a
                data-testid="lil-kt-nav"
                className="test-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
              >
                lil-kt
              </a>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex flex-1 flex-col justify-center items-center w-screen">
        {children}
      </main>
    </div>
  )
}
