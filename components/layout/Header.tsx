import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { BiCategory, BiCollection, BiHome } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'

import { CATEGORIES_PATH, INDEX_PATH, PRODUCTS_PATH } from '../../constants/paths'
import logo from '../../public/image.webp'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const collapseRef = useRef<HTMLDivElement>(null)
  const { pathname } = useRouter()

  return (
    <header style={{ marginBottom: 100 }}>
      <nav className='navbar navbar-expand-lg navbar-light bg-light px-2 overflow-hidden'>
        <div className='container-fluid' ref={collapseRef}>
          <Link href={INDEX_PATH}>
            <div style={{ width: '50%', maxWidth: '150px', cursor: 'pointer' }}>
              <Image src={logo} alt='GoPOS logo' />
            </div>
          </Link>
          <button className='navbar-toggler' aria-label='Toggle navigation' onClick={() => setIsOpen(prev => !prev)}>
            <GiHamburgerMenu className='navbar-toggler-icon' />
          </button>
          <div className='navbar-collapse ms-lg-5'>
            <ul className='navbar-nav flex-row justify-content-center gap-2 me-lg-auto mb-lg-0'>
              <li className='nav-link'>
                <Link href={INDEX_PATH}>
                  <a className={clsx('nav-link', pathname === INDEX_PATH && 'active')}>
                    <BiHome style={{ width: 24, height: 24 }} className='bi d-lg-block mx-lg-auto mb-1 d-none' />
                    Home
                  </a>
                </Link>
              </li>
              <li className='nav-link'>
                <Link href={PRODUCTS_PATH}>
                  <a className={clsx('nav-link', pathname === PRODUCTS_PATH && 'active')}>
                    <BiCategory style={{ width: 24, height: 24 }} className='bi d-lg-block mx-lg-auto mb-1 d-none' />
                    Products
                  </a>
                </Link>
              </li>
              <li className='nav-link'>
                <Link href={CATEGORIES_PATH}>
                  <a className={clsx('nav-link', pathname === CATEGORIES_PATH && 'active')}>
                    <BiCollection style={{ width: 24, height: 24 }} className='bi d-lg-block mx-lg-auto mb-1 d-none' />
                    Categories
                  </a>
                </Link>
              </li>
            </ul>
            <div>
              <input className='form-control me-2' type='search' placeholder='Search' aria-label='Search' />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
