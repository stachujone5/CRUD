import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'

import { API_URL } from '../../constants/api'
import { CATEGORIES_PATH } from '../../constants/paths'
import { useCategories } from '../../hooks/useCategories'
import { useUpdate } from '../../hooks/useUpdate'
import { Alert } from '../shared/Alert'
import { Container } from '../shared/Container'
import { Message } from '../shared/Message'

import type { FormEvent } from 'react'

export const EditCategoryPageContent = () => {
  const categoryInputRef = useRef<HTMLInputElement>(null)

  const { push, query } = useRouter()
  const { categories, isError } = useCategories()

  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const { alertMsg, isCooldown, setAlertMsg, setIsCooldown, setVariant, update, variant } = useUpdate()

  const currentCategory = categories.find(c => c.id.toString() === id)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (categoryInputRef.current?.value.trim() === currentCategory?.name) {
      setAlertMsg('Update category info!')
      setVariant('danger')
      setIsCooldown()
      return
    }

    if (!categoryInputRef.current?.value) {
      setAlertMsg('Name cannot be empty!')
      setVariant('danger')
      setIsCooldown()
      return
    }

    update({
      path: `${API_URL}/ajax/219/product_categories/${id}`,
      body: {
        name: categoryInputRef.current.value
      },
      successMsg: 'Category edited!'
    })
  }

  const handleDelete = () => {
    update({ path: `${API_URL}/ajax/219/product_categories/${id}`, method: 'delete', successMsg: 'Category deleted, redirecting...' })
    setTimeout(() => void push(CATEGORIES_PATH), 1000)
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
          <form className='mx-auto' style={{ maxWidth: '18rem' }} onSubmit={handleSubmit}>
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
            <div className='d-flex justify-content-center gap-2'>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
              <button type='button' onClick={handleDelete} className='btn btn-primary'>
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
