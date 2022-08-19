import { useCategories } from '../../hooks/useCategories'

import type { CombinedProduct } from '../../hooks/useProducts'
import type { FormEvent } from 'react'

interface Props {
  readonly onSubmit: () => void
  readonly product: CombinedProduct
}

export const ProductEdit = ({ onSubmit, product }: Props) => {
  const { categories } = useCategories()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <>
      <h1 className='mb-5'>Product info:</h1>
      <div className='card mx-auto' style={{ maxWidth: '18rem' }}>
        <form className='list-group list-group-flush' onSubmit={handleSubmit}>
          <input
            className='list-group-item text-center'
            style={{ background: '#00000008' }}
            defaultValue={product.name}
          />
          <input className='list-group-item text-center' defaultValue={product.id} />
          <input className='list-group-item text-center' defaultValue={product.category_id} />
          <input className='list-group-item text-center' defaultValue={product.tax_id} />
          <input className='list-group-item text-center' defaultValue={product.measure_type} />
          <input className='list-group-item text-center' defaultValue={new Date(product.updated_at).toDateString()} />
          <select className='list-group-item text-center' defaultValue={product.category}>
            {categories.map(c => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <button type='submit' className='px-5 btn btn-primary' style={{ borderRadius: 0 }}>
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
