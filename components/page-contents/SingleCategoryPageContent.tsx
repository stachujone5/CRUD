import Head from 'next/head'
import { useRouter } from 'next/router'

import { CATEGORIES_PATH } from '../../constants/paths'
import { useCategories } from '../../hooks/useCategories'
import { Container } from '../shared/Container'
import { LinkButton } from '../shared/LinkButton'
import { Message } from '../shared/Message'

export const SingleCategoryPageContent = () => {
  const { query } = useRouter()
  const { categories, isError } = useCategories()

  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const currentCategory = categories.find(c => c.id.toString() === id)

  return (
    <Container>
      <Head>
        <title>{currentCategory?.name}</title>
      </Head>
      {isError && <Message className='text-danger'>Couldn't fetch product!</Message>}
      {currentCategory && (
        <>
          <h1 className='mb-5'>Category info</h1>
          <div className='mx-auto card' style={{ maxWidth: '22rem' }}>
            <h5 className='card-header'>{currentCategory.name}</h5>
            <div className='card-body'>
              <h5 className='card-title'>ID: {currentCategory.id}</h5>
              <p className='list-group-item'>Updated at: {new Date(currentCategory.updated_at).toLocaleDateString()}</p>
              <LinkButton className='w-100' href={`${CATEGORIES_PATH}/${id}/edit`}>
                Edit
              </LinkButton>
            </div>
          </div>
        </>
      )}
    </Container>
  )
}
