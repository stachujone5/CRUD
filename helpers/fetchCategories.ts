import axios from 'axios'

import { API_URL } from '../constants/api'

import type { Category } from '../types'

export const fetchCategories = async () => {
  // eslint-disable-next-line -- it exists
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION!
  try {
    const category = await axios.get<{ readonly data: readonly Category[] }>(`${API_URL}/ajax/219/product_categories`, {
      headers: { Authorization: authorization }
    })
    return category.data.data
  } catch (err) {
    throw new Error('Failed to fetch!')
  }
}
