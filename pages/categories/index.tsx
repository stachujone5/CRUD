import axios from 'axios'

import { CategoriesPageContent } from '../../components/page-contents/CategoriesPageContent'

export interface Category {
  readonly id: number
  readonly name: string
  readonly status: string
  readonly uid: string
  readonly updated_at: string
}

interface Props {
  readonly categories: readonly Category[]
  readonly isError: boolean
}

const CategoriesPage = ({ categories, isError }: Props) => {
  return <CategoriesPageContent categories={categories} isError={isError} />
}

export default CategoriesPage

export async function getServerSideProps() {
  // eslint-disable-next-line -- it exists
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION!

  try {
    const categories = await axios.get<{ readonly data: readonly Category[] }>(
      'https://newdemostock.gopos.pl/ajax/219/product_categories',
      {
        headers: { Authorization: authorization }
      }
    )

    return {
      props: { categories: categories.data.data, isError: false }
    }
  } catch {
    return {
      props: { categories: [], isError: true }
    }
  }
}
