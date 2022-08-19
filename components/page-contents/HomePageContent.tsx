import Head from 'next/head'

import { PRODUCTS_PATH } from '../../constants/paths'
import { Container } from '../shared/Container'
import { LinkButton } from '../shared/LinkButton'

export const HomePageContent = () => {
  return (
    <Container>
      <Head>
        <title>Home</title>
      </Head>
      <h1 className='mb-4'>GoPOS recruitment task</h1>
      <LinkButton href={PRODUCTS_PATH}>Browse our products!</LinkButton>
    </Container>
  )
}
