import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { API_URL } from '../../constants/api'
import { customFetch } from '../../helpers/fetch'
import { Card } from '../shared/Card'
import { Container } from '../shared/Container'
import { Message } from '../shared/Message'

import type { Category } from '../../types'

export interface Product {
  readonly category_id: number
  readonly cost_price_gross_money: {
    readonly amount: number
    readonly currency: string
  }
  readonly cost_price_money: {
    readonly amount: number
    readonly currency: string
  }
  readonly id: number
  readonly measure_type: string
  readonly name: string
  readonly recipe_amount: number
  readonly state: {
    readonly available_amount: number
    readonly commited_amount: number
    readonly in_stock_amount: number
    readonly incoming_amount: number
  }
  readonly status: string
  readonly tax_id: number
  readonly type: string
  readonly uid: string
  readonly updated_at: string
}

interface EditedProduct {
  readonly category: string
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

      return { name: p.name, category: pCategory.name, uid: p.uid }
    })

    setEditedProducts(newProducts)
  }, [products, categories])

  return (
    <Container>
      <Head>
        <title>Products</title>
      </Head>
      <h1 className='mb-5'>Products Page</h1>
      <div className='d-flex justify-content-center flex-wrap gap-4'>
        {(productsError || categoriesError) && <Message className='text-danger'>Couldn't fetch products!</Message>}
        {(producsLoading || categoriesLoading) && <Message className='text-primary'>Loading...</Message>}
        {editedProducts?.map(p => (
          <Card key={p.uid} text={p.category} header={p.name} />
        ))}
      </div>
    </Container>
  )
}
