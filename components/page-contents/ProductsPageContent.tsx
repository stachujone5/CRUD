import Head from 'next/head'

import { PRODUCTS_PATH } from '../../constants/paths'
import { useProducts } from '../../hooks/useProducts'
import { Card } from '../shared/Card'
import { Container } from '../shared/Container'
import { Message } from '../shared/Message'

export const ProductsPageContent = () => {
  const { isError, products } = useProducts()

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
