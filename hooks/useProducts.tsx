import { useQuery } from '@tanstack/react-query'

import { API_URL } from '../constants/api'
import { customFetch } from '../helpers/fetch'

import { useCategories } from './useCategories'

interface Product {
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

// hook returns products with their category

export const useProducts = () => {
  const { data: products, isError: productsError } = useQuery(['products'], () =>
    customFetch<{ readonly data: readonly Product[] }>(`${API_URL}/ajax/219/products`)
  )

  const { categories, isError: categoriesError } = useCategories()

  const newProducts = products
    ? products?.data.map(p => {
        const pCategory = categories.find(c => c.id === p.category_id) ?? { name: 'Category not found' }

        return { category: pCategory.name, ...p }
      })
    : []

  const isError = productsError || categoriesError ? true : false

  return { products: newProducts, isError }
}
