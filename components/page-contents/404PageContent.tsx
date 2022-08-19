import Head from 'next/head'

import { INDEX_PATH } from '../../constants/paths'
import { LinkButton } from '../shared/LinkButton'

export const Custom404PageContent = () => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center min-vh-100'>
      <Head>
        <title>Not found!</title>
      </Head>
      <h1 className='mb-3'>Page not found!</h1>
      <LinkButton href={INDEX_PATH}>Go back to home page</LinkButton>
    </div>
  )
}
