import { useRouter } from 'next/router'
import { useState } from 'react'

import { useProducts } from '../../hooks/useProducts'
import { Container } from '../shared/Container'
import { Message } from '../shared/Message'
import { ProductEdit } from '../single-product/ProductEdit'
import { ProductList } from '../single-product/ProductList'

export const SingleProductPageContent = () => {
  const [isEditing, setIsEditing] = useState(false)

  const { query } = useRouter()
  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const { isError, products } = useProducts()

  const currentProduct = products.find(p => p.id.toString() === id)

  return (
    <Container>
      {isError && <Message className='text-danger'>Couldn't fetch product!</Message>}
      {currentProduct &&
        (isEditing ? (
          <ProductEdit product={currentProduct} onSubmit={() => setIsEditing(false)} />
        ) : (
          <ProductList product={currentProduct} onClick={() => setIsEditing(true)} />
        ))}
    </Container>
  )
}
