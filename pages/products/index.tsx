import { ProductsPageContent } from '../../components/page-contents/ProductsPageContent'
import { fetchCategories } from '../../helpers/fetchCategories'
import { fetchProducts } from '../../helpers/fetchProducts'

import type { Product } from '../../types'

export interface CombinedProduct extends Product {
  readonly category: string
}
export interface ProductsPageProps {
  readonly combinedProducts: readonly CombinedProduct[]
  readonly isError: boolean
}

const ProductsPage = (props: ProductsPageProps) => {
  return <ProductsPageContent {...props} />
}

export default ProductsPage

export async function getStaticProps() {
  try {
    const products = await fetchProducts()
    const categories = await fetchCategories()

    const combinedProducts = products.map(p => {
      const pCategory = categories.find(c => c.id === p.category_id) ?? { name: 'Category not found' }

      return { category: pCategory.name, ...p }
    })

    return {
      props: {
        combinedProducts,
        isError: false
      },
      revalidate: 1
    }
  } catch (err) {
    return {
      props: {
        combinedProducts: [],
        isError: true
      },
      revalidate: 1
    }
  }
}
