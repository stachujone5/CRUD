import axios from 'axios'
import Head from 'next/head'
import { useRef, useState } from 'react'

import { API_URL } from '../../constants/api'
import { useCategories } from '../../hooks/useCategories'
import { useCooldown } from '../../hooks/useCooldown'
import { Alert } from '../shared/Alert'
import { Container } from '../shared/Container'

import type { FormEvent } from 'react'

export const AddPageContent = () => {
  const [alertMsg, setAlertMsg] = useState('')
  const [variant, setVariant] = useState<'success' | 'danger'>('success')

  const productInputRef = useRef<HTMLInputElement>(null)
  const productSelectRef = useRef<HTMLSelectElement>(null)
  const categoryInputRef = useRef<HTMLInputElement>(null)

  const { categories } = useCategories()

  const [isCooldown, setIsCooldown] = useCooldown()

  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION

  const handleProductSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!productSelectRef.current) return

    const category = categories.find(c => c.id.toString() === productSelectRef.current?.value)

    if (!category) {
      setAlertMsg('Please select category!')
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

    axios
      .post(`${API_URL}/ajax/219/products/?userId=${authorization}`, {
        name: productInputRef.current.value,
        recipe_amount: 1,
        type: 'BASIC',
        status: 'ENABLED',
        measure_type: 'KILOGRAM',
        category_id: category.id,
        tax_id: 1
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

    productInputRef.current.value = ''
    productSelectRef.current.selectedIndex = 0
  }
  const handleCategorySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAlertMsg('')

    if (!categoryInputRef.current?.value) {
      setAlertMsg('Name cannot be empty!')
      setVariant('danger')
      setIsCooldown()
      return
    }

    axios
      .post(`${API_URL}/ajax/219/product_categories/?userId=${authorization}`, {
        name: categoryInputRef.current.value
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

    categoryInputRef.current.value = ''
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
            <input className='form-control' id='product' placeholder='Product' ref={productInputRef} />
            <label htmlFor='product'>Product name</label>
          </div>
          <select className='form-select mb-3' ref={productSelectRef}>
            <option defaultChecked>Choose category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button type='submit' className='btn btn-primary px-5 mt-2'>
            Add product
          </button>
        </form>
        <form onSubmit={handleCategorySubmit}>
          <div className='form-floating mb-3 text-start'>
            <input className='form-control' id='category' placeholder='Category' ref={categoryInputRef} />
            <label htmlFor='category'>Category name</label>
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
