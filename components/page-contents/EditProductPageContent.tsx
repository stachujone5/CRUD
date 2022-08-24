import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'

import { API_URL } from '../../constants/api'
import { PRODUCTS_PATH } from '../../constants/paths'
import { fetchCategories } from '../../helpers/fetchCategories'
import { fetchSingleCombinedProduct } from '../../helpers/fetchSingleCombinedProduct'
import { useUpdate } from '../../hooks/useUpdate'
import { Alert } from '../shared/Alert'
import { Button } from '../shared/Button'
import { Container } from '../shared/Container'
import { Loading } from '../shared/Loading'
import { Message } from '../shared/Message'

import type { FormEvent } from 'react'

export const EditProductPageContent = () => {
  const productInputRef = useRef<HTMLInputElement>(null)
  const productSelectRef = useRef<HTMLSelectElement>(null)

  const { alertMsg, handleDelete, handleUpdate, isCooldown, setAlertMsg, setIsCooldown, setVariant, variant } =
    useUpdate()

  const { push, query } = useRouter()

  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const {
    data: product,
    isError: isErrorProduct,
    isLoading: isLoadingProduct
  } = useQuery(['combinedProduct', id], () => fetchSingleCombinedProduct(id))
  const {
    data: categories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories
  } = useQuery(['categories', id], fetchCategories)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!product || !productSelectRef.current) return

    e.preventDefault()

    if (
      productInputRef.current?.value.trim() === product.name &&
      productSelectRef.current.value === product.category_id.toString()
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

    handleUpdate({
      path: `${API_URL}/ajax/219/products/${id}`,
      body: {
        measure_type: product.measure_type,
        type: product.type,
        tax_id: product.tax_id,
        name: productInputRef.current.value,
        category_id: productSelectRef.current.value
      },
      successMsg: 'Product edited!'
    })
  }

  const deleteProduct = () => {
    handleDelete({
      path: `${API_URL}/ajax/219/products/${id}`,
      successMsg: 'Product deleted, redirecting...',
      cb: () => setTimeout(() => void push(PRODUCTS_PATH), 1000)
    })
  }

  if (isLoadingProduct || isLoadingCategories) {
    return <Loading />
  }

  return (
    <Container>
      <Head>
        <title>{isErrorProduct || isErrorCategories ? 'Error' : 'Edit product'}</title>
      </Head>
      {isErrorProduct || isErrorCategories ? (
        <Message className='text-danger'>Couldn't fetch product!</Message>
      ) : (
        <>
          <h1 className='mb-5'>Edit product</h1>
          <form onSubmit={handleSubmit} className='mx-auto' style={{ maxWidth: '22rem' }}>
            <div className='form-floating mb-3 text-start'>
              <input
                className='form-control'
                id='name'
                placeholder='Edit product'
                ref={productInputRef}
                defaultValue={product.name}
              />
              <label htmlFor='name'>Edit product</label>
            </div>

            <select className='form-select mb-3' ref={productSelectRef}>
              {categories.map(c => (
                <option key={c.id} value={c.id} selected={c.id === product.category_id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className='d-flex justify-content-center gap-2'>
              <Button type='submit' className='px-5'>
                Submit
              </Button>
              <Button type='button' onClick={deleteProduct} className='px-5'>
                Delete
              </Button>
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
