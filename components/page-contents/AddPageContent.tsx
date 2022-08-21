import axios from 'axios'
import Head from 'next/head'
import { useRef, useState } from 'react'

import { API_URL } from '../../constants/api'
import { useCooldown } from '../../hooks/useCooldown'
import { Alert } from '../shared/Alert'
import { Container } from '../shared/Container'

import type { FormEvent } from 'react'

export const AddPageContent = () => {
  const productsInputRef = useRef<HTMLInputElement>(null)
  const categoriesInputRef = useRef<HTMLInputElement>(null)
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION

  const [error, setError] = useState('')
  const [variant, setVariant] = useState<'success' | 'danger'>('success')

  const [isCooldown, setIsCooldown] = useCooldown()

  const handleProductSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!productsInputRef.current?.value) {
      setError('Value cannot be empty!')
      setVariant('danger')
      setIsCooldown()
      return
    }

    axios
      .post(`${API_URL}/ajax/219/product_categories/?userId=${authorization}`, {
        name: productsInputRef.current.value
      })
      .then(res => {
        setError('Product added!')
        setVariant('success')
        setIsCooldown()
        console.log(res)
      })
      .catch(err => {
        setError('Something went wrong!')
        setVariant('danger')
        setIsCooldown()
        console.log(err)
      })

    productsInputRef.current.value = ''
  }
  const handleCategorySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!categoriesInputRef.current?.value) {
      setError('Value cannot be empty!')
      setVariant('danger')
      setIsCooldown()
      return
    }

    axios
      .post(`${API_URL}/ajax/219/product_categories/?userId=${authorization}`, {
        name: categoriesInputRef.current.value
      })
      .then(res => {
        setError('Category added!')
        setVariant('success')
        setIsCooldown()
        console.log(res)
      })
      .catch(err => {
        setError('Something went wrong!')
        setVariant('danger')
        setIsCooldown()
        console.log(err)
      })

    categoriesInputRef.current.value = ''
  }

  return (
    <Container>
      <Head>
        <title>Add</title>
      </Head>
      <h1 className='mb-5'>Add product or category</h1>

      <div className='d-flex flex-wrap justify-content-center gap-5 mb-5'>
        <form onSubmit={handleProductSubmit}>
          <input placeholder='Product' type='text' className='form-control' ref={productsInputRef} />
          <button type='submit' className='btn btn-primary px-5 mt-2'>
            Add product
          </button>
        </form>
        <form onSubmit={handleCategorySubmit}>
          <input placeholder='Category' type='text' className='form-control' ref={categoriesInputRef} />
          <button type='submit' className='btn btn-primary px-5 mt-2'>
            Add category
          </button>
        </form>
      </div>
      {isCooldown && (
        <Alert className='w-50 mx-auto' variant={variant}>
          {error}
        </Alert>
      )}
    </Container>
  )
}
