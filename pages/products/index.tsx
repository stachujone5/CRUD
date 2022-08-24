import axios from 'axios'

import { ProductsPageContent } from '../../components/page-contents/ProductsPageContent'

import type { Category } from '../categories'

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

export interface CombinedProduct extends Product {
  readonly category: string
}

interface Props {
  readonly isError: boolean
  readonly products: readonly CombinedProduct[]
}

const ProductsPage = ({ isError, products }: Props) => {
  return <ProductsPageContent products={products} isError={isError} />
}

export default ProductsPage

export async function getServerSideProps() {
  // eslint-disable-next-line -- it exists
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION!

  try {
    const products = await axios.get<{ readonly data: readonly Product[] }>(
      'https://newdemostock.gopos.pl/ajax/219/products',
      {
        headers: { Authorization: authorization }
      }
    )

    const categories = await axios.get<{ readonly data: readonly Category[] }>(
      'https://newdemostock.gopos.pl/ajax/219/product_categories',
      {
        headers: { Authorization: authorization }
      }
    )

    const newProducts = products
      ? products?.data.data.map(p => {
          const pCategory = categories.data.data.find(c => c.id === p.category_id) ?? { name: 'Category not found' }

          return { category: pCategory.name, ...p }
        })
      : []

    return {
      props: { products: newProducts, isError: false }
    }
  } catch {
    return {
      props: { products: [], isError: true }
    }
  }
}
