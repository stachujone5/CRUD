import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'

import { useCategories } from '../../hooks/useCategories'
import { useProducts } from '../../hooks/useProducts'
import { Container } from '../shared/Container'
import { Message } from '../shared/Message'

import type { FormEvent } from 'react'

export const SingleProductPageContent = () => {
  const { isError, products } = useProducts()
  const { categories } = useCategories()
  const { query } = useRouter()

  const productInputRef = useRef<HTMLInputElement>(null)
  const productSelectRef = useRef<HTMLSelectElement>(null)

  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const currentProduct = products.find(p => p.id.toString() === id)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Container>
      <Head>
        <title>Edit product</title>
      </Head>
      {isError && <Message className='text-danger'>Couldn't fetch product!</Message>}
      {currentProduct && (
        <>
          <h1 className='mb-5'>Edit product</h1>
          <form onSubmit={handleSubmit} className='mx-auto' style={{ maxWidth: '18rem' }}>
            <div className='form-floating mb-3 text-start'>
              <input
                className='form-control'
                id='name'
                placeholder='Edit product'
                ref={productInputRef}
                defaultValue={currentProduct.name}
              />
              <label htmlFor='name'>Edit product</label>
            </div>

            <select className='form-select mb-3' defaultValue={currentProduct.category} ref={productSelectRef}>
              {categories.map(c => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <button type='submit' className='px-5 btn btn-primary'>
              Submit
            </button>
          </form>
        </>
      )}
    </Container>
  )
}
