import Link from 'next/link'

import { INDEX_PATH } from '../../constants/paths'

export const Custom404PageContent = () => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center min-vh-100'>
      <h1 className='mb-3'>Page not found!</h1>
      <Link href={INDEX_PATH}>
        <a className='btn btn-dark p-3'>Go back to home page</a>
      </Link>
    </div>
  )
}
