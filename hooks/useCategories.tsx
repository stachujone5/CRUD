import { useQuery } from '@tanstack/react-query'

import { API_URL } from '../constants/api'
import { customFetch } from '../helpers/fetch'

import type { Category } from '../types'

export const useCategories = () => {
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION

  const { data, isError } = useQuery(['categories'], () =>
    customFetch<{ readonly data: readonly Category[] }>(
      `${API_URL}/ajax/219/product_categories?userId=${authorization}`
    )
  )

  const categories = data ? data.data : []

  return { categories, isError }
}
