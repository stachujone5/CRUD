import Head from 'next/head'

import { PRODUCTS_PATH } from '../../constants/paths'
import { Card } from '../shared/Card'
import { Container } from '../shared/Container'
import { Message } from '../shared/Message'

import type { CombinedProduct } from '../../pages/products'

interface Props {
  readonly isError: boolean
  readonly products: readonly CombinedProduct[]
}

export const ProductsPageContent = ({ isError, products }: Props) => {
  return (
    <Container>
      <Head>
        <title>Products</title>
      </Head>
      <h1 className='mb-5'>Products</h1>
      <div className='d-flex justify-content-center flex-wrap gap-4'>
        {isError && <Message className='text-danger'>Couldn't fetch products!</Message>}
        {products.map(p => (
          <Card key={p.id} text={p.category} header={p.name} href={`${PRODUCTS_PATH}/${p.id}`} />
        ))}
      </div>
    </Container>
  )
}
