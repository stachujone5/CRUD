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

  const [alertMsg, setAlertMsg] = useState('')
  const [variant, setVariant] = useState<'success' | 'danger'>('success')

  const [isCooldown, setIsCooldown] = useCooldown()

  const handleProductSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAlertMsg('')

    if (!productsInputRef.current?.value) {
      setAlertMsg('Value cannot be empty!')
      setVariant('danger')
      setIsCooldown()
      return
    }

    axios
      .post(`${API_URL}/ajax/219/product_categories/?userId=${authorization}`, {
        name: productsInputRef.current.value
      })
      .then(res => {
        setAlertMsg('Product added!')
        setVariant('success')
        setIsCooldown()
        console.log(res)
      })
      .catch(err => {
        setAlertMsg('Something went wrong!')
        setVariant('danger')
        setIsCooldown()
        console.log(err)
      })

    productsInputRef.current.value = ''
  }
  const handleCategorySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAlertMsg('')

    if (!categoriesInputRef.current?.value) {
      setAlertMsg('Value cannot be empty!')
      setVariant('danger')
      setIsCooldown()
      return
    }

    axios
      .post(`${API_URL}/ajax/219/product_categories/?userId=${authorization}`, {
        name: categoriesInputRef.current.value
      })
      .then(res => {
        setAlertMsg('Category added!')
        setVariant('success')
        setIsCooldown()
        console.log(res)
      })
      .catch(err => {
        setAlertMsg('Something went wrong!')
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
          <div className='form-floating mb-3 text-start'>
            <input className='form-control' id='product' placeholder='Product' ref={productsInputRef} />
            <label htmlFor='product'>Add product</label>
          </div>
          <button type='submit' className='btn btn-primary px-5 mt-2'>
            Add product
          </button>
        </form>
        <form onSubmit={handleCategorySubmit}>
          <div className='form-floating mb-3 text-start'>
            <input className='form-control' id='category' placeholder='Category' ref={categoriesInputRef} />
            <label htmlFor='category'>Add category</label>
          </div>
          <button type='submit' className='btn btn-primary px-5 mt-2'>
            Add category
          </button>
        </form>
      </div>
      {isCooldown && (
        <Alert className='w-50 mx-auto' variant={variant}>
          {alertMsg}
        </Alert>
      )}
    </Container>
  )
}
