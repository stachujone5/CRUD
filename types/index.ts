import type { ReactNode } from 'react'

export interface Children {
  readonly children: ReactNode
}

export interface Category {
  readonly id: number
  readonly name: string
  readonly status: string
  readonly uid: string
  readonly updated_at: string
}
