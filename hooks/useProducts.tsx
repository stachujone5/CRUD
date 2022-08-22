import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { API_URL } from '../constants/api'
import { customFetch } from '../helpers/fetch'

import { useCategories } from './useCategories'

import type { Product } from '../types'

export interface CombinedProduct extends Product {
  readonly category: string
}

// hook returns products with their category

export const useProducts = () => {
  const [editedProducts, setEditedProducts] = useState<readonly CombinedProduct[]>([])
  const [isError, setIsError] = useState(false)

  const { data: products, isError: productsError } = useQuery(['products'], () =>
    customFetch<{ readonly data: readonly Product[] }>(`${API_URL}/ajax/219/products`)
  )

  const { categories, isError: categoriesError } = useCategories()

  useEffect(() => {
    if (!products) return

    if (categoriesError || productsError) {
      setIsError(true)
    }

    const newProducts = products.data.map(p => {
      const pCategory = categories.find(c => c.id === p.category_id) ?? { name: 'Category not found' }

      return { category: pCategory.name, ...p }
    })

    setEditedProducts(newProducts)
  }, [products, categories, categoriesError, productsError])

  return { products: editedProducts, isError }
}
