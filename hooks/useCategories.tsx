import { useQuery } from '@tanstack/react-query'

import { API_URL } from '../constants/api'
import { customFetch } from '../helpers/fetch'

interface Category {
  readonly id: number
  readonly name: string
  readonly status: string
  readonly uid: string
  readonly updated_at: string
}

export const useCategories = () => {
  const { data, isError } = useQuery(['categories'], () =>
    customFetch<{ readonly data: readonly Category[] }>(`${API_URL}/ajax/219/product_categories`)
  )

  const categories = data ? data.data : []

  return { categories, isError }
}
