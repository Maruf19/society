import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Programme from './pages/Programme'
import Activities from './pages/Activities'

function App() {
  return (
        <BrowserRouter>
    <Routes>
      <Route index element={ <Home />} />
      <Route path='Home' element={ <Home />} />
      <Route path='About' element={ <About />} />
      <Route path='Programme' element={ <Programme />} />
      <Route path='Activities' element={ <Activities />} />
      <Route path='Contact' element={ <Contact />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
