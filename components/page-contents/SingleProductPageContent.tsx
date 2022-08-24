import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { PRODUCTS_PATH } from '../../constants/paths'
import { fetchCombinedProduct } from '../../helpers/fetchCombinedProduct'
import { Container } from '../shared/Container'
import { LinkButton } from '../shared/LinkButton'
import { Loading } from '../shared/Loading'
import { Message } from '../shared/Message'

export const SingleProductPageContent = () => {
  const { query } = useRouter()

  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const { data: product, isError, isLoading } = useQuery(['combinedProduct', id], () => fetchCombinedProduct(id))

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container>
      <Head>
        <title>{isError ? 'Error' : product.name}</title>
      </Head>

      {isError ? (
        <Message className='text-danger'>Couldn't fetch product!</Message>
      ) : (
        <>
          <h1 className='mb-5'>Product info</h1>
          <div className='mx-auto card' style={{ maxWidth: '22rem' }}>
            <h5 className='card-header'>{product.name}</h5>
            <div className='card-body'>
              <h5 className='card-title'>{product.category}</h5>
              <ul className='list-group list-group-flush mb-2'>
                <li className='list-group-item'>ProductID: {product.id}</li>
                <li className='list-group-item'>CategoryID: {product.category_id}</li>
                <li className='list-group-item'>Updated at: {new Date(product.updated_at).toLocaleDateString()}</li>
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
