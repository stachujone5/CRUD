import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { CATEGORIES_PATH } from '../../constants/paths'
import { fetchSingleCategory } from '../../helpers/fetchSingleCategory'
import { Container } from '../shared/Container'
import { LinkButton } from '../shared/LinkButton'
import { Loading } from '../shared/Loading'
import { Message } from '../shared/Message'

export const SingleCategoryPageContent = () => {
  const { query } = useRouter()

  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const { data: category, isError, isLoading } = useQuery(['category', id], () => fetchSingleCategory(id))

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container>
      <Head>
        <title>{isError ? 'Error' : category.name}</title>
      </Head>
      {isError ? (
        <Message className='text-danger'>Couldn't fetch category!</Message>
      ) : (
        <>
          <h1 className='mb-5'>Category info</h1>
          <div className='mx-auto card' style={{ maxWidth: '22rem' }}>
            <h5 className='card-header'>{category.name}</h5>
            <div className='card-body'>
              {category.status === 'DELETED' ? (
                <Message className='mt-5 text-danger'>This category was deleted!</Message>
              ) : (
                <>
                  <h5 className='card-title'>ID: {category.id}</h5>
                  <p className='list-group-item'>Updated at: {new Date(category.updated_at).toLocaleDateString()}</p>
                  <LinkButton className='w-100' href={`${CATEGORIES_PATH}/${id}/edit`}>
                    Edit
                  </LinkButton>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  )
}
