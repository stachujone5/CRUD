import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiCategory, BiCollection, BiHome } from 'react-icons/bi'

import { CATEGORIES_PATH, INDEX_PATH, PRODUCTS_PATH } from '../../constants/paths'
import { Container } from '../shared/Container'

export const Header = () => {
  const { pathname } = useRouter()

  return (
    <header className='position-fixed w-100'>
      <div className='px-3 py-2 text-bg-dark bg-dark'>
        <Container>
          <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
            <Link href={INDEX_PATH}>
              <a className='h2 text-white text-decoration-none d-none me-5 d-lg-block'>GoPOS</a>
            </Link>
            <form className='me-lg-auto col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3' role='search'>
              <input
                type='search'
                className='form-control text-white bg-dark'
                placeholder='Search...'
                aria-label='Search'
              />
            </form>
            <ul className='nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small'>
              <li className={clsx('btn btn-dark', pathname === INDEX_PATH && 'active')}>
                <Link href={INDEX_PATH}>
                  <a className='nav-link text-white'>
                    <BiHome style={{ width: 24, height: 24 }} className='bi d-block mx-auto mb-1' />
                    Home
                  </a>
                </Link>
              </li>
              <li className={clsx('btn btn-dark', pathname === PRODUCTS_PATH && 'active')}>
                <Link href={PRODUCTS_PATH}>
                  <a className='nav-link text-white'>
                    <BiCategory style={{ width: 24, height: 24 }} className='bi d-block mx-auto mb-1' />
                    Products
                  </a>
                </Link>
              </li>
              <li className={clsx('btn btn-dark', pathname === CATEGORIES_PATH && 'active')}>
                <Link href={CATEGORIES_PATH}>
                  <a className='nav-link text-white'>
                    <BiCollection style={{ width: 24, height: 24 }} className='bi d-block mx-auto mb-1' />
                    Categories
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </header>
  )
}
