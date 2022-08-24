import axios from 'axios'

import { API_URL } from '../constants/api'

import type { Category } from '../pages/categories'
import type { Product } from '../pages/products'

export const fetchCombinedProduct = async (id: string) => {
  // eslint-disable-next-line -- it exists
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION!
  try {
    const product = await axios.get<{ readonly data: Product }>(`${API_URL}/ajax/219/products/${id}`, {
      headers: { Authorization: authorization }
    })

    const productID = product.data.data.category_id

    const category = await axios.get<{ readonly data: Category }>(
      `${API_URL}/ajax/219/product_categories/${productID}`,
      {
        headers: { Authorization: authorization }
      }
    )
    return { ...product.data.data, category: category.data.data.name }
  } catch (err) {
    throw new Error('Failed to fetch!')
  }
}
