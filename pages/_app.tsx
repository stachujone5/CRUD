import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Layout } from '../components/layout/Layout'

import type { AppProps } from 'next/app'

import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}

export default MyApp
