import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef } from 'react'

import { API_URL } from '../../constants/api'
import { CATEGORIES_PATH } from '../../constants/paths'
import { fetchSingleCategory } from '../../helpers/fetchSingleCategory'
import { revalidate } from '../../helpers/revalidate'
import { useUpdate } from '../../hooks/useUpdate'
import { Alert } from '../shared/Alert'
import { Button } from '../shared/Button'
import { Container } from '../shared/Container'
import { Loading } from '../shared/Loading'
import { Message } from '../shared/Message'

import type { FormEvent } from 'react'

export const EditCategoryPageContent = () => {
  const categoryInputRef = useRef<HTMLInputElement>(null)

  const { push, query } = useRouter()

  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const { data: category, isError, isLoading } = useQuery(['category', id], () => fetchSingleCategory(id))

  const { alertMsg, handleDelete, handleUpdate, isCooldown, setAlertMsg, setIsCooldown, setVariant, variant } =
    useUpdate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (categoryInputRef.current?.value.trim() === category?.name) {
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

    handleUpdate({
      path: `${API_URL}/ajax/219/product_categories/${id}`,
      body: {
        name: categoryInputRef.current.value
      },
      successMsg: 'Category edited!',
      cb: () => revalidate()
    })
  }

  const deleteCategory = () => {
    void handleDelete({
      path: `${API_URL}/ajax/219/product_categories/${id}`,
      successMsg: 'Category deleted, redirecting...',
      errorMsg: 'Cannot delete category!',
      cb: () => {
        revalidate()
        setTimeout(() => void push(CATEGORIES_PATH), 1000)
      }
    })
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container>
      <Head>
        <title>{isError ? 'Error' : 'Edit category'}</title>
      </Head>
      {isError ? (
        <Message className='text-danger'>Couldn't fetch category!</Message>
      ) : (
        <>
          <h1 className='mb-5'>Edit category</h1>
          <form className='mx-auto' style={{ maxWidth: '18rem' }} onSubmit={handleSubmit}>
            <div className='form-floating mb-3 text-start'>
              <input
                className='form-control'
                id='name'
                placeholder='Edit category'
                ref={categoryInputRef}
                defaultValue={category.name}
              />
              <label htmlFor='name'>Category name</label>
            </div>
            <div className='d-flex justify-content-center gap-2'>
              <Button type='submit'>Submit</Button>
              <Button type='button' onClick={deleteCategory}>
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
