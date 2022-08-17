import { BiCategory, BiCollection, BiHome } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import type { CSSProperties } from 'react'

export const Header = () => {
  const iconStyle: CSSProperties = { width: 24, height: 24 }
  const iconClasses = 'bi d-block mx-auto mb-1'

  return (
    <header>
      <div className='px-3 py-2 text-bg-dark bg-dark'>
        <div className='container'>
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
              <li>
                <Link to='' className='nav-link text-white outline-light'>
                  <BiHome style={iconStyle} className={iconClasses} />
                  Home
                </Link>
              </li>
              <li>
                <Link to='' className='nav-link text-white'>
                  <BiCategory style={iconStyle} className={iconClasses} />
                  Products
                </Link>
              </li>
              <li>
                <Link to='' className='nav-link text-white'>
                  <BiCollection style={iconStyle} className={iconClasses} />
                  Categories
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
