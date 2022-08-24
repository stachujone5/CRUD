import Head from 'next/head'

import { INDEX_PATH } from '../../constants/paths'
import { Container } from '../shared/Container'
import { LinkButton } from '../shared/LinkButton'

export const Custom404PageContent = () => {
  return (
    <Container>
      <Head>
        <title>Not found!</title>
      </Head>
      <h1 className='mb-5'>Page not found!</h1>
      <LinkButton href={INDEX_PATH}>Go back to home page</LinkButton>
    </Container>
  )
}
