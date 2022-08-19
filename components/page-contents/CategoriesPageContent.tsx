import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'

import { API_URL } from '../../constants/api'
import { CATEGORIES_PATH } from '../../constants/paths'
import { customFetch } from '../../helpers/fetch'
import { Card } from '../shared/Card'
import { Container } from '../shared/Container'
import { Message } from '../shared/Message'

import type { Category } from '../../types'

export const CategoriesPageContent = () => {
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION

  const { data, isError, isLoading } = useQuery(['categories'], () =>
    customFetch<{ readonly data: readonly Category[] }>(
      `${API_URL}/ajax/219/product_categories?userId=${authorization}`
    )
  )
  return (
    <Container>
      <Head>
        <title>Categories</title>
      </Head>
      <h1 className='mb-5'>Categories</h1>
      <div className='d-flex justify-content-center flex-wrap gap-4'>
        {isError && <Message className='text-danger'>Couldn't fetch categories!</Message>}
        {isLoading && <Message className='text-primary'>Loading...</Message>}
        {data?.data.map(c => (
          <Card header={c.name} key={c.uid} href={`${CATEGORIES_PATH}/${c.id.toString()}`} />
        ))}
      </div>
    </Container>
  )
}
