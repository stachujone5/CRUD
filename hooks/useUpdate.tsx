import axios from 'axios'
import { useState } from 'react'

import { useCooldown } from './useCooldown'

import type { AxiosError } from 'axios'

interface Props<BodyType = { readonly [key: string]: any }> {
  readonly body: BodyType
  readonly cb?: () => void
  readonly errorMsg?: string
  readonly path: string
  readonly successMsg?: string
}

interface Error {
  readonly errors: readonly [{ readonly message: string }]
}

const NAME_TOO_LONG_ERROR_MSG = 'constraints.maxLength'
const NAME_TAKEN_PRODUCT_ERROR_MSG = 'product_with_name_exists'
const NAME_TAKEN_CATEGORY_ERROR_MSG = 'constraints.nameIsUnique'

export const useUpdate = <BodyType,>() => {
  const [isCooldown, setIsCooldown] = useCooldown()
  const [variant, setVariant] = useState<'success' | 'danger'>('success')
  const [alertMsg, setAlertMsg] = useState('')

  // eslint-disable-next-line -- it exists
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION!

  const headers = { Authorization: authorization }

  const isError = (err?: Error) => {
    const error = err?.errors?.[0].message

    if (error === NAME_TAKEN_PRODUCT_ERROR_MSG || error === NAME_TAKEN_CATEGORY_ERROR_MSG) {
      setAlertMsg('This name already exists!')
      return
    }
    if (error === NAME_TOO_LONG_ERROR_MSG) {
      setAlertMsg('Name is too long!')
      return
    }
  }

  const handleDelete = ({
    cb,
    errorMsg = 'Something went wrong',
    path,
    successMsg = 'Success'
  }: Omit<Props, 'body'>) => {
    return axios
      .delete(path, { headers })
      .then(() => {
        setIsCooldown()
        setVariant('success')
        setAlertMsg(successMsg)
        cb?.()
      })
      .catch(() => {
        setIsCooldown()
        setVariant('danger')
        setAlertMsg(errorMsg)
      })
  }

  const handleUpdate = ({ body, errorMsg = 'Something went wrong', path, successMsg = 'Success' }: Props<BodyType>) => {
    axios
      .put(path, body, { headers })
      .then(() => {
        setIsCooldown()
        setVariant('success')
        setAlertMsg(successMsg)
      })
      .catch((err: AxiosError<Error>) => {
        setIsCooldown()
        setVariant('danger')
        isError(err.response?.data)
        setAlertMsg(errorMsg)
      })
  }

  const handleCreate = ({ body, errorMsg = 'Something went wrong', path, successMsg = 'Success' }: Props<BodyType>) => {
    axios
      .post(path, body, { headers })
      .then(() => {
        setIsCooldown()
        setVariant('success')
        setAlertMsg(successMsg)
      })
      .catch((err: AxiosError<Error>) => {
        setIsCooldown()
        setVariant('danger')
        isError(err.response?.data)
        setAlertMsg(errorMsg)
      })
  }

  return {
    isCooldown,
    variant,
    alertMsg,
    handleUpdate,
    handleCreate,
    handleDelete,
    setAlertMsg,
    setVariant,
    setIsCooldown
  }
}
