import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { API_URL } from '../constants/api'
import { customFetch } from '../helpers/fetch'

import type { Category, Product } from '../types'

export interface CombinedProduct extends Product {
  readonly category: string
}

// hook returns products with their category

export const useProducts = () => {
  const [editedProducts, setEditedProducts] = useState<readonly CombinedProduct[]>([])
  const [isError, setIsError] = useState(false)

  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION

  const { data: products, isError: productsError } = useQuery(['products'], () =>
    customFetch<{ readonly data: readonly Product[] }>(`${API_URL}/ajax/219/products?userId=${authorization}`)
  )

  const { data: categories, isError: categoriesError } = useQuery(['categories'], () =>
    customFetch<{ readonly data: readonly Category[] }>(
      `${API_URL}/ajax/219/product_categories?userId=${authorization}`
    )
  )

  useEffect(() => {
    if (!products || !categories) return

    if (categoriesError || productsError) {
      setIsError(true)
    }

    const newProducts = products.data.map(p => {
      const pCategory = categories.data.find(c => c.id === p.category_id) ?? { name: 'Category not found' }

      return { category: pCategory.name, ...p }
    })

    setEditedProducts(newProducts)
  }, [products, categories, categoriesError, productsError])
  return { products: editedProducts, isError }
}
