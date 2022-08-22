import axios from 'axios'
import { useState } from 'react'

import { useCooldown } from './useCooldown'

import type { AxiosError } from 'axios'

interface Props {
  readonly errrorMsg: string
  readonly successMsg: string
}

interface UpdateProps {
  readonly body: { readonly [key: string]: any }
  readonly method?: 'post' | 'put'
  readonly path: string
}

export const useUpdateProducts = ({ errrorMsg, successMsg }: Props) => {
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
      .catch((err: AxiosError) => {
        setIsCooldown()
        setVariant('danger')
        if (err.response?.status === 422) {
          setAlertMsg(errrorMsg)
          return
        }
        setAlertMsg('Something went wrong!')
      })
  }

  return { isCooldown, variant, alertMsg, update, setAlertMsg, setVariant, setIsCooldown }
}
