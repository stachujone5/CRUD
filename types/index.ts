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

export interface Product {
  readonly category_id: number
  readonly cost_price_gross_money: {
    readonly amount: number
    readonly currency: string
  }
  readonly cost_price_money: {
    readonly amount: number
    readonly currency: string
  }
  readonly id: number
  readonly measure_type: string
  readonly name: string
  readonly recipe_amount: number
  readonly state: {
    readonly available_amount: number
    readonly commited_amount: number
    readonly in_stock_amount: number
    readonly incoming_amount: number
  }
  readonly status: string
  readonly tax_id: number
  readonly type: string
  readonly uid: string
  readonly updated_at: string
}
