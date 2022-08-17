import Head from 'next/head'
import { useEffect } from 'react'

import { API_URL } from '../../constants/api'

export const HomePageContent = () => {
  // eslint-disable-next-line -- it exists
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION!

  useEffect(() => {
    fetch(`${API_URL}/api/219/product_categories`, {
      mode: 'no-cors',
      headers: {
        Authorization: authorization
      }
    }).catch(err => console.log(err))
  }, [authorization])

  return (
    <div className='d-flex flex-column align-items-center justify-content-center min-vh-100'>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Home page</h1>
    </div>
  )
}
