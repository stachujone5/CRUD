import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { API_URL } from '../../constants/api'
import { customFetch } from '../../helpers/fetch'
import { Container } from '../shared/Container'
import { Message } from '../shared/Message'

import type { Product } from '../../types'

export const SingleProductPageContent = () => {
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION
  const { query } = useRouter()
  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const { data, isError } = useQuery([query], () =>
    customFetch<{ readonly data: Product }>(`${API_URL}/ajax/219/products/${id}?userId=${authorization}`)
  )

  return (
    <Container>
      {isError && <Message className='text-danger'>Couldn't fetch product!</Message>}
      {data?.data && (
        <>
          <h1 className='mb-5'>{data.data.name}</h1>
          <div className='card mx-auto' style={{ maxWidth: '18rem' }}>
            <div className='card-header'>Product info:</div>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>ID: {data.data.id}</li>
              <li className='list-group-item'>CategoryID: {data.data.category_id}</li>
              <li className='list-group-item'>TaxID: {data.data.tax_id}</li>
              <li className='list-group-item'>Measure type: {data.data.measure_type}</li>
              <li className='list-group-item'>UpdatedAt: {new Date(data.data.updated_at).toDateString()}</li>
            </ul>
            <button className='px-5 btn btn-primary' style={{ borderRadius: 0 }}>
              Edit
            </button>
          </div>
        </>
      )}
    </Container>
  )
}
