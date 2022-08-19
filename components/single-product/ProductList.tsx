import type { CombinedProduct } from '../../hooks/useProducts'
import type { MouseEventHandler } from 'react'

interface Props {
  readonly onClick: MouseEventHandler<HTMLButtonElement>
  readonly product: CombinedProduct
}

export const ProductList = ({ onClick, product }: Props) => {
  return (
    <>
      <h1 className='mb-5'>Product info:</h1>
      <div className='card mx-auto' style={{ maxWidth: '18rem' }}>
        <div className='card-header'>Name: {product.name}</div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>ID: {product.id}</li>
          <li className='list-group-item'>CategoryID: {product.category_id}</li>
          <li className='list-group-item'>TaxID: {product.tax_id}</li>
          <li className='list-group-item'>Measure type: {product.measure_type}</li>
          <li className='list-group-item'>UpdatedAt: {new Date(product.updated_at).toDateString()}</li>
        </ul>
        <button className='px-5 btn btn-primary' style={{ borderRadius: 0 }} onClick={onClick}>
          Edit
        </button>
      </div>
    </>
  )
}
