import { Footer } from './Footer'
import { Header } from './Header'

import type { Children } from '../../types'

export const Layout = ({ children }: Children) => {
  return (
    <>
      <Header />
      <main>
        <div className='container'>{children}</div>
      </main>
      <Footer />
    </>
  )
}
