import axios from 'axios'
import { useState } from 'react'

import { useCooldown } from './useCooldown'

import type { AxiosError } from 'axios'

interface Props {
  readonly errrorMsg: string
  readonly path: string
  readonly successMsg: string
}

export const useUpdateProducts = ({ errrorMsg, path, successMsg }: Props) => {
  const [isCooldown, setIsCooldown] = useCooldown()
  const [variant, setVariant] = useState<'success' | 'danger'>('success')
  const [alertMsg, setAlertMsg] = useState('')

  // eslint-disable-next-line -- it exists
  const authorization = process.env.NEXT_PUBLIC_AUTHORIZATION!

  const update = (body: { readonly [key: string]: any }) => {
    axios
      .put(path, body, {
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
