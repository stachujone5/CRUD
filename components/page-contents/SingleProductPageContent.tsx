import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import { API_URL } from '../../constants/api'
import { useCategories } from '../../hooks/useCategories'
import { useCooldown } from '../../hooks/useCooldown'
import { useProducts } from '../../hooks/useProducts'
import { Alert } from '../shared/Alert'
import { Container } from '../shared/Container'
import { Message } from '../shared/Message'

import type { FormEvent } from 'react'

export const SingleProductPageContent = () => {
  const [variant, setVariant] = useState<'success' | 'danger'>('success')
  const [alertMsg, setAlertMsg] = useState('')

  const { isError, products } = useProducts()
  const { categories } = useCategories()
  const { query } = useRouter()
  const [isCooldown, setIsCooldown] = useCooldown()

  const productInputRef = useRef<HTMLInputElement>(null)
  const productSelectRef = useRef<HTMLSelectElement>(null)

  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION
  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const currentProduct = products.find(p => p.id.toString() === id)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!currentProduct) return

    if (!productInputRef.current || !productSelectRef.current) return

    e.preventDefault()
    axios
      .put(
        `${API_URL}/ajax/219/products/${id}?userId=${authorization}`,
        {
          measure_type: 'KILOGRAM',
          type: 'BASIC',
          tax_id: 1,
          name: productInputRef.current.value,
          category_id: productSelectRef.current.value
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        setIsCooldown()
        setVariant('success')
        setAlertMsg('Product edited!')
        console.log(res)
      })
      .catch(err => {
        setIsCooldown()
        setVariant('danger')
        setAlertMsg('Something went wrong!')
        console.log(err)
      })
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
                <option key={c.id} value={c.id}>
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
      {isCooldown && (
        <Alert className='w-50 mx-auto mt-4' variant={variant}>
          {alertMsg}
        </Alert>
      )}
    </Container>
  )
}
