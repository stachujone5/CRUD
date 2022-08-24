import axios from 'axios'

import { API_URL } from '../constants/api'

import type { Product } from './../pages/products/index'

export const fetchProducts = async () => {
  // eslint-disable-next-line -- it exists
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION!
  try {
    const category = await axios.get<{ readonly data: readonly Product[] }>(`${API_URL}/ajax/219/products`, {
      headers: { Authorization: authorization }
    })
    return category.data.data
  } catch {
    throw new Error('Failed to fetch!')
  }
}
