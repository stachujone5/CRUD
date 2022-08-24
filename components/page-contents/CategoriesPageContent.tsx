import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { CATEGORIES_PATH } from '../../constants/paths'
import { fetchCategories } from '../../helpers/fetchCategories'
import { Card } from '../shared/Card'
import { Container } from '../shared/Container'
import { Loading } from '../shared/Loading'
import { Message } from '../shared/Message'

export const CategoriesPageContent = () => {
  const { query } = useRouter()

  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const { data: categories, isError, isLoading } = useQuery(['categories', id], fetchCategories)

  if (isLoading) {
    return <Loading />
  }
  return (
    <Container>
      <Head>
        <title>{isError ? 'Error' : 'Categories'}</title>
      </Head>
      <h1 className='mb-5'>Categories</h1>
      <div className='d-flex justify-content-center flex-wrap gap-4'>
        {isError ? (
          <Message className='text-danger'>Couldn't fetch categories!</Message>
        ) : (
          categories.map(c => <Card header={c.name} key={c.uid} href={`${CATEGORIES_PATH}/${c.id.toString()}`} />)
        )}
      </div>
    </Container>
  )
}
