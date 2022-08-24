import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { PRODUCTS_PATH } from '../../constants/paths'
import { fetchCategories } from '../../helpers/fetchCategories'
import { fetchProducts } from '../../helpers/fetchProducts'
import { Card } from '../shared/Card'
import { Container } from '../shared/Container'
import { Loading } from '../shared/Loading'
import { Message } from '../shared/Message'

export const ProductsPageContent = () => {
  const { query } = useRouter()

  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const {
    data: products,
    isError: isErrorProducts,
    isLoading: isLoadingProducts
  } = useQuery(['combinedProduct', id], fetchProducts)
  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories
  } = useQuery(['categories', id], fetchCategories)

  const newProducts =
    products && categories
      ? products.map(p => {
          const pCategory = categories.find(c => c.id === p.category_id) ?? { name: 'Category not found' }

          return { category: pCategory.name, ...p }
        })
      : []

  if (isLoadingCategories || isLoadingProducts) {
    return <Loading />
  }

  return (
    <Container>
      <Head>
        <title>Products</title>
      </Head>
      <h1 className='mb-5'>Products</h1>
      <div className='d-flex justify-content-center flex-wrap gap-4'>
        {(isErrorCategories || isErrorProducts) && <Message className='text-danger'>Couldn't fetch products!</Message>}
        {newProducts.map(p => (
          <Card key={p.id} text={p.category} header={p.name} href={`${PRODUCTS_PATH}/${p.id}`} />
        ))}
      </div>
    </Container>
  )
}
