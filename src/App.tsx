import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <ReactLenis root options={{ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  )
}

export default App

