import Head from 'next/head'

import { CATEGORIES_PATH } from '../../constants/paths'
import { Card } from '../shared/Card'
import { Container } from '../shared/Container'
import { Message } from '../shared/Message'

import type { CategoriesPageProps } from '../../pages/categories'

export const CategoriesPageContent = ({ categories, isError }: CategoriesPageProps) => {
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
