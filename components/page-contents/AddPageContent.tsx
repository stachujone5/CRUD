import axios from 'axios'
import clsx from 'clsx'
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

  const [isCategoryError, setIsCategoryError] = useState(false)
  const [isProductError, setIsProductError] = useState(false)

  const [isCooldown, setIsCooldown] = useCooldown()

  const categoriesInputClasses = clsx('form-control', isCategoryError && 'border-danger')
  const productsInputClasses = clsx('form-control', isProductError && 'border-danger')

  const handleProductSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProductError(false)

    if (!categoriesInputRef.current?.value) {
      setIsProductError(true)
      return
    }

    axios
      .post(`${API_URL}/ajax/219/product_categories/?userId=${authorization}`, {
        name: categoriesInputRef.current.value
      })
      .then(res => {
        setIsProductError(false)
        setIsCooldown()
        console.log(res)
      })
      .catch(err => {
        setIsProductError(true)
        console.log(err)
      })

    categoriesInputRef.current.value = ''
  }
  const handleCategorySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCategoryError(false)

    if (!categoriesInputRef.current?.value) {
      setIsCategoryError(true)
      return
    }

    axios
      .post(`${API_URL}/ajax/219/product_categories/?userId=${authorization}`, {
        name: categoriesInputRef.current.value
      })
      .then(res => {
        setIsCategoryError(false)
        setIsCooldown()
        console.log(res)
      })
      .catch(err => {
        setIsCategoryError(true)
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
          <input type='text' className={productsInputClasses} ref={productsInputRef} />
          <button type='submit' className='btn btn-primary px-5 mt-2'>
            Add product
          </button>
        </form>
        <form onSubmit={handleCategorySubmit}>
          <input type='text' className={categoriesInputClasses} ref={categoriesInputRef} />
          <button type='submit' className='btn btn-primary px-5 mt-2'>
            Add category
          </button>
        </form>
      </div>
      {isCooldown && <Alert className='w-50 mx-auto'>Success</Alert>}
    </Container>
  )
}
