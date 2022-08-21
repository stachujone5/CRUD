import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import { API_URL } from '../../constants/api'
import { CATEGORIES_PATH } from '../../constants/paths'
import { useCategories } from '../../hooks/useCategories'
import { useCooldown } from '../../hooks/useCooldown'
import { Alert } from '../shared/Alert'
import { Container } from '../shared/Container'
import { Message } from '../shared/Message'

import type { FormEvent } from 'react'

export const SingleCategoryPageContent = () => {
  const [alertMsg, setAlertMsg] = useState('')
  const [variant, setVariant] = useState<'success' | 'danger'>('success')

  const categoryInputRef = useRef<HTMLInputElement>(null)

  const { push, query } = useRouter()
  const { categories, isError, refetch } = useCategories()
  const [isCooldown, setIsCooldown] = useCooldown()

  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION

  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const currentCategory = categories.find(c => c.id.toString() === id)

  const handleCategoryEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!categoryInputRef.current?.value) {
      setAlertMsg('Value cannot be empty!')
      setVariant('danger')
      setIsCooldown()
      return
    }

    axios
      .put(`${API_URL}/ajax/219/product_categories/${currentCategory?.id}/?userId=${authorization}`, {
        name: categoryInputRef.current.value
      })
      .then(res => {
        setAlertMsg('Category edited!')
        setVariant('success')
        setIsCooldown()
        void refetch()
        setTimeout(() => void push(CATEGORIES_PATH), 1500)
        console.log(res)
      })
      .catch(err => {
        setAlertMsg('Something went wrong!')
        setVariant('danger')
        setIsCooldown()
        console.log(err)
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
              <label htmlFor='name'>Edit category</label>
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
