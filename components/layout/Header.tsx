import Link from 'next/link'
import { BiCategory, BiCollection, BiHome } from 'react-icons/bi'

import { CATEGORIES_PATH, INDEX_PATH, PRODUCTS_PATH } from '../../constants/paths'
import { Container } from '../shared/Container'

import type { CSSProperties } from 'react'

export const Header = () => {
  const iconStyle: CSSProperties = { width: 24, height: 24 }
  const iconClasses = 'bi d-block mx-auto mb-1'

  return (
    <header>
      <div className='px-3 py-2 text-bg-dark bg-dark'>
        <Container>
          <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
            <form className='me-lg-auto col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3' role='search'>
              <input
                type='search'
                className='form-control text-white bg-dark'
                placeholder='Search...'
                aria-label='Search'
              />
            </form>
            <ul className='nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small'>
              <li className='btn btn-dark'>
                <Link href={INDEX_PATH}>
                  <a className='nav-link text-white'>
                    <BiHome style={iconStyle} className={iconClasses} />
                    Home
                  </a>
                </Link>
              </li>
              <li className='btn btn-dark'>
                <Link href={PRODUCTS_PATH}>
                  <a className='nav-link text-white'>
                    <BiCategory style={iconStyle} className={iconClasses} />
                    Products
                  </a>
                </Link>
              </li>
              <li className='btn btn-dark'>
                <Link href={CATEGORIES_PATH}>
                  <a className='nav-link text-white'>
                    <BiCollection style={iconStyle} className={iconClasses} />
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
