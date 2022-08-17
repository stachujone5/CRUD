import { Container } from '../shared/Container'

import { Footer } from './Footer'
import { Header } from './Header'

import type { Children } from '../../types'

export const Layout = ({ children }: Children) => {
  return (
    <>
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  )
}
