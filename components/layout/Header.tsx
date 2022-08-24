import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiCategory, BiCollection, BiHome } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdOutlineCreateNewFolder } from 'react-icons/md'

import { ADD_PATH, CATEGORIES_PATH, INDEX_PATH, PRODUCTS_PATH } from '../../constants/paths'
import { fetchProducts } from '../../helpers/fetchProducts'
import logo from '../../public/logo.webp'

import type { ChangeEvent } from 'react'

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const { pathname, query } = useRouter()

  const id = typeof query.id !== 'object' && typeof query.id !== 'undefined' ? query.id : ''

  const { data } = useQuery(['products', id], () => fetchProducts())

  const matchingProducs = inputValue ? data?.filter(p => p.name.toLowerCase().includes(inputValue.toLowerCase())) : []

  const collapseClasses = clsx('navbar-collapse ms-lg-5', !isNavOpen && 'd-none')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <header style={{ marginBottom: 100 }}>
      <nav className='navbar navbar-expand-lg navbar-light bg-light px-2 overflow-hidden overflow-visible'>
        <div className='container-fluid'>
          <Link href={INDEX_PATH}>
            <div style={{ width: '50%', maxWidth: '150px', cursor: 'pointer' }}>
              <Image src={logo} alt='GoPOS logo' />
            </div>
          </Link>
          <button className='navbar-toggler' aria-label='Toggle navigation' onClick={() => setIsNavOpen(prev => !prev)}>
            <GiHamburgerMenu className='navbar-toggler-icon' />
          </button>
          <div className={collapseClasses}>
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
              <li className='nav-link'>
                <Link href={ADD_PATH}>
                  <a className={clsx('nav-link', pathname === ADD_PATH && 'active')}>
                    <MdOutlineCreateNewFolder
                      style={{ width: 24, height: 24 }}
                      className='bi d-lg-block mx-lg-auto mb-1 d-none'
                    />
                    Add
                  </a>
                </Link>
              </li>
            </ul>
            <div className='position-relative'>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search products'
                aria-label='Search products'
                onChange={handleInputChange}
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setIsSearchOpen(false)
                  }, 200)
                }
                value={inputValue}
              />
              {isSearchOpen && (
                <ul className='position-absolute list-group w-100 mt-2'>
                  {matchingProducs?.map(p => (
                    <Link key={p.id} href={`${PRODUCTS_PATH}/${p.id}`}>
                      <a className='d-block list-group-item' onClick={() => setInputValue('')}>
                        {p.name}
                      </a>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
