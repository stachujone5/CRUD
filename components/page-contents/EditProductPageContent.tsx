import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'

import { API_URL } from '../../constants/api'
import { PRODUCTS_PATH } from '../../constants/paths'
import { useCategories } from '../../hooks/useCategories'
import { useProducts } from '../../hooks/useProducts'
import { useUpdate } from '../../hooks/useUpdate'
import { Alert } from '../shared/Alert'
import { Container } from '../shared/Container'
import { Message } from '../shared/Message'

import type { FormEvent } from 'react'

export const EditProductPageContent = () => {
  const productInputRef = useRef<HTMLInputElement>(null)
  const productSelectRef = useRef<HTMLSelectElement>(null)

  const { alertMsg, isCooldown, setAlertMsg, setIsCooldown, setVariant, update, variant } = useUpdate()
  const { categories } = useCategories()
  const { isError, products } = useProducts()
  const { push, query } = useRouter()

  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const currentProduct = products.find(p => p.id.toString() === id)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!currentProduct || !productSelectRef.current) return

    e.preventDefault()

    if (
      productInputRef.current?.value.trim() === currentProduct.name &&
      productSelectRef.current.value === currentProduct.category_id.toString()
    ) {
      setAlertMsg('Update product info!')
      setVariant('danger')
      setIsCooldown()
      return
    }

    if (!productInputRef.current?.value) {
      setAlertMsg('Name cannot be empty!')
      setVariant('danger')
      setIsCooldown()
      return
    }

    update({
      path: `${API_URL}/ajax/219/products/${id}`,
      body: {
        measure_type: currentProduct.measure_type,
        type: currentProduct.type,
        tax_id: currentProduct.tax_id,
        name: productInputRef.current.value,
        category_id: productSelectRef.current.value
      },
      successMsg: 'Product edited!'
    })
  }

  const handleDelete = () => {
    update({
      path: `${API_URL}/ajax/219/products/${id}`,
      method: 'delete',
      successMsg: 'Product deleted, redirecting...'
    })
    setTimeout(() => void push(PRODUCTS_PATH), 1000)
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
          <form onSubmit={handleSubmit} className='mx-auto' style={{ maxWidth: '22rem' }}>
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

            <select className='form-select mb-3' ref={productSelectRef}>
              {categories.map(c => (
                <option key={c.id} value={c.id} selected={c.id === currentProduct.category_id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className='d-flex justify-content-center gap-2'>
              <button type='submit' className='px-5 btn btn-primary'>
                Submit
              </button>
              <button type='button' onClick={handleDelete} className='px-5 btn btn-primary'>
                Delete
              </button>
            </div>
          </form>
        </>
      )}
      {isCooldown && (
        <Alert className='w-50 mx-auto mt-4' variant={variant}>
          {alertMsg}
        </Alert>
      )}
    </Container>
  )
}
