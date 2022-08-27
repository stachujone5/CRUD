import { CategoriesPageContent } from '../../components/page-contents/CategoriesPageContent'
import { fetchCategories } from '../../helpers/fetchCategories'

import type { Category } from '../../types'

export interface CategoriesPageProps {
  readonly categories: readonly Category[]
  readonly isError: boolean
}

const CategoriesPage = (props: CategoriesPageProps) => {
  return <CategoriesPageContent {...props} />
}

export default CategoriesPage

export async function getStaticProps() {
  try {
    const categories = await fetchCategories()

    return {
      props: {
        categories,
        isError: false
      },
      revalidate: 1
    }
  } catch (err) {
    return {
      props: {
        categories: [],
        isError: true
      },
      revalidate: 1
    }
  }
}
