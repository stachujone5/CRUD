import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'

import { API_URL } from '../../constants/api'
import { useCategories } from '../../hooks/useCategories'
import { useUpdateProducts } from '../../hooks/useUpdateProducts'
import { Alert } from '../shared/Alert'
import { Container } from '../shared/Container'
import { Message } from '../shared/Message'

import type { FormEvent } from 'react'

export const EditCategoryPageContent = () => {
  const categoryInputRef = useRef<HTMLInputElement>(null)

  const { query } = useRouter()
  const { categories, isError } = useCategories()

  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const { alertMsg, isCooldown, setAlertMsg, setIsCooldown, setVariant, update, variant } = useUpdateProducts({
    successMsg: 'Category edited',
    errrorMsg: 'This name already exists!',
    path: `${API_URL}/ajax/219/product_categories/${id}`
  })

  const currentCategory = categories.find(c => c.id.toString() === id)

  const handleCategoryEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!categoryInputRef.current?.value) {
      setAlertMsg('Name cannot be empty!')
      setVariant('danger')
      setIsCooldown()
      return
    }

    update({
      name: categoryInputRef.current.value
    })
  }

  return (
    <Container>
      <Head>
        <title>Edit category</title>
      </Head>
      {isError && <Message className='text-danger'>Couldn't fetch category!</Message>}
      {currentCategory && (
        <>
          <h1 className='mb-5'>Edit category</h1>
          <form className='mx-auto' style={{ maxWidth: '18rem' }} onSubmit={handleCategoryEdit}>
            <div className='form-floating mb-3 text-start'>
              <input
                className='form-control'
                id='name'
                placeholder='Edit category'
                ref={categoryInputRef}
                defaultValue={currentCategory.name}
              />
              <label htmlFor='name'>Category name</label>
            </div>
            <button className='btn btn-primary'>Submit</button>
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
