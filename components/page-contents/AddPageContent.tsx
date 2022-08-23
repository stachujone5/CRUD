import Head from 'next/head'
import { useRef } from 'react'

import { API_URL } from '../../constants/api'
import { useCategories } from '../../hooks/useCategories'
import { useUpdate } from '../../hooks/useUpdate'
import { Alert } from '../shared/Alert'
import { Button } from '../shared/Button'
import { Container } from '../shared/Container'

import type { FormEvent } from 'react'

export const AddPageContent = () => {
  const productInputRef = useRef<HTMLInputElement>(null)
  const productSelectRef = useRef<HTMLSelectElement>(null)
  const categoryInputRef = useRef<HTMLInputElement>(null)

  const { categories } = useCategories()

  const { alertMsg, handleCreate, isCooldown, setAlertMsg, setIsCooldown, setVariant, variant } = useUpdate()

  const handleProductSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!productSelectRef.current) return

    const category = categories.find(c => c.id.toString() === productSelectRef.current?.value)

    if (!productInputRef.current?.value) {
      setAlertMsg('Name cannot be empty!')
      setVariant('danger')
      setIsCooldown()
      return
    }

    if (!category) {
      setAlertMsg('Please select category!')
      setVariant('danger')
      setIsCooldown()
      return
    }

    handleCreate({
      path: `${API_URL}/ajax/219/products`,
      body: {
        name: productInputRef.current.value,
        recipe_amount: 1,
        type: 'BASIC',
        status: 'ENABLED',
        measure_type: 'KILOGRAM',
        category_id: category.id,
        tax_id: 1
      },
      successMsg: 'Product added!'
    })

    productInputRef.current.value = ''
    productSelectRef.current.selectedIndex = 0
  }
  const handleCategorySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!categoryInputRef.current?.value) {
      setAlertMsg('Name cannot be empty!')
      setVariant('danger')
      setIsCooldown()
      return
    }

    handleCreate({
      path: `${API_URL}/ajax/219/product_categories`,
      body: {
        name: categoryInputRef.current.value
      },
      successMsg: 'Category added!'
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
          <Button type='submit' className='px-5 mt-2'>
            Add product
          </Button>
        </form>
        <form onSubmit={handleCategorySubmit}>
          <div className='form-floating mb-3 text-start'>
            <input className='form-control' id='category' placeholder='Category' ref={categoryInputRef} />
            <label htmlFor='category'>Category name</label>
          </div>
          <Button type='submit' className='px-5 mt-2'>
            Add category
          </Button>
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
