import Head from 'next/head'

import { Container } from '../shared/Container'
import { LinkButton } from '../shared/LinkButton'

export const HomePageContent = () => {
  return (
    <Container>
      <Head>
        <title>Home</title>
      </Head>
      <h1 className='mb-4'>GoPOS recruitment task</h1>
      <LinkButton>Browse our products!</LinkButton>
    </Container>
  )
}
