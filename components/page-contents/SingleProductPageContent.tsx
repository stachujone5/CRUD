import Head from 'next/head'
import { useRouter } from 'next/router'

import { PRODUCTS_PATH } from '../../constants/paths'
import { useProducts } from '../../hooks/useProducts'
import { Container } from '../shared/Container'
import { LinkButton } from '../shared/LinkButton'
import { Message } from '../shared/Message'

export const SingleProductPageContent = () => {
  const { query } = useRouter()
  const { isError, products } = useProducts()

  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const currentProduct = products.find(p => p.id.toString() === id)

  return (
    <Container>
      <Head>
        <title>{currentProduct?.name}</title>
      </Head>
      {isError && <Message className='text-danger'>Couldn't fetch product!</Message>}
      {currentProduct && (
        <>
          <h1 className='mb-5'>Product info</h1>
          <div className='mx-auto card' style={{ maxWidth: '22rem' }}>
            <h5 className='card-header'>{currentProduct.name}</h5>
            <div className='card-body'>
              <h5 className='card-title'>{currentProduct.category}</h5>
              <ul className='list-group list-group-flush mb-2'>
                <li className='list-group-item'>ProductID: {currentProduct.id}</li>
                <li className='list-group-item'>CategoryID: {currentProduct.category_id}</li>
                <li className='list-group-item'>
                  Updated at: {new Date(currentProduct.updated_at).toLocaleDateString()}
                </li>
              </ul>
              <LinkButton className='w-100' href={`${PRODUCTS_PATH}/${id}/edit`}>
                Edit
              </LinkButton>
            </div>
          </div>
        </>
      )}
    </Container>
  )
}
