import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from './components/page-contents/Home'
import { INDEX_PATH } from './constants/paths'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={INDEX_PATH} element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
