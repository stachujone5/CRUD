import axios from 'axios'
import { useState } from 'react'

import { useCooldown } from './useCooldown'

import type { AxiosError } from 'axios'

interface UpdateProps {
  readonly body?: { readonly [key: string]: any }
  readonly method?: 'post' | 'put' | 'delete'
  readonly path: string
}

const NAME_TOO_LONG_ERROR_MSG = 'constraints.maxLength'
const NAME_TAKEN_PRODUCT_ERROR_MSG = 'product_with_name_exists'
const NAME_TAKEN_CATEGORY_ERROR_MSG = 'constraints.nameIsUnique'

export const useUpdate = (successMsg: string) => {
  const [isCooldown, setIsCooldown] = useCooldown()
  const [variant, setVariant] = useState<'success' | 'danger'>('success')
  const [alertMsg, setAlertMsg] = useState('')

  // eslint-disable-next-line -- it exists
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION!

  const update = ({ body, method = 'put', path }: UpdateProps) => {
    axios[method](path, body, {
      headers: { Authorization: authorization }
    })
      .then(res => {
        setIsCooldown()
        setVariant('success')
        setAlertMsg(successMsg)
        console.log(res)
      })
      .catch((err: AxiosError<{ readonly errors: readonly [{ readonly message: string }] }>) => {
        const errorMsg = err.response?.data.errors[0].message
        setIsCooldown()
        setVariant('danger')
        console.log(err)
        if (errorMsg === NAME_TAKEN_PRODUCT_ERROR_MSG || errorMsg === NAME_TAKEN_CATEGORY_ERROR_MSG) {
          setAlertMsg('This name already exists!')
          return
        }
        if (errorMsg === NAME_TOO_LONG_ERROR_MSG) {
          setAlertMsg('Name is too long!')
          return
        }
        setAlertMsg('Something went wrong!')
      })
  }

  return { isCooldown, variant, alertMsg, update, setAlertMsg, setVariant, setIsCooldown }
}
