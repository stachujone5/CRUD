import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { API_URL } from '../../constants/api'
import { PRODUCTS_PATH } from '../../constants/paths'
import { customFetch } from '../../helpers/fetch'
import { Card } from '../shared/Card'
import { Container } from '../shared/Container'
import { Message } from '../shared/Message'

import type { Category, Product } from '../../types'

interface EditedProduct {
  readonly category: string
  readonly id: string
  readonly name: string
  readonly uid: string
}

export const ProductsPageContent = () => {
  const [editedProducts, setEditedProducts] = useState<readonly EditedProduct[]>([])

  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION

  const {
    data: products,
    isError: productsError,
    isLoading: producsLoading
  } = useQuery(['products'], () =>
    customFetch<{ readonly data: readonly Product[] }>(`${API_URL}/ajax/219/products?userId=${authorization}`)
  )

  const {
    data: categories,
    isError: categoriesError,
    isLoading: categoriesLoading
  } = useQuery(['categories'], () =>
    customFetch<{ readonly data: readonly Category[] }>(
      `${API_URL}/ajax/219/product_categories?userId=${authorization}`
    )
  )

  useEffect(() => {
    if (!products || !categories) return

    const newProducts = products.data.map(p => {
      const pCategory = categories.data.find(c => c.id === p.category_id) ?? { name: 'Category not found' }

      return { name: p.name, category: pCategory.name, uid: p.uid, id: p.id.toString() }
    })

    setEditedProducts(newProducts)
  }, [products, categories])

  return (
    <Container>
      <Head>
        <title>Products</title>
      </Head>
      <h1 className='mb-5'>Products</h1>
      <div className='d-flex justify-content-center flex-wrap gap-4'>
        {(productsError || categoriesError) && <Message className='text-danger'>Couldn't fetch products!</Message>}
        {(producsLoading || categoriesLoading) && <Message className='text-primary'>Loading...</Message>}
        {editedProducts?.map(p => (
          <Card key={p.uid} text={p.category} header={p.name} href={`${PRODUCTS_PATH}/${p.id}`} />
        ))}
      </div>
    </Container>
  )
}
