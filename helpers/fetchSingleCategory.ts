import axios from 'axios'

import { API_URL } from '../constants/api'

import type { Category } from '../pages/categories'

export const fetchSingleCategory = async (id: string) => {
  // eslint-disable-next-line -- it exists
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION!
  try {
    const category = await axios.get<{ readonly data: Category }>(`${API_URL}/ajax/219/product_categories/${id}`, {
      headers: { Authorization: authorization }
    })
    return { ...category.data.data }
  } catch {
    throw new Error('Failed to fetch!')
  }
}
