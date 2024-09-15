import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Schedule from './pages/Schedule'
import Activities from './pages/Activities'
import Team from './pages/Team'
import Registration from './pages/Registration'
import Testimonial from './pages/Testimonial'
function App() {
  return (
        <BrowserRouter>
    <Routes>
      <Route index element={ <Home />} />
      <Route path='Home' element={ <Home />} />
      <Route path='About' element={ <About />} />
      <Route path='testimonial' element={ <Testimonial />} />
      <Route path='team' element={ <Team />} />
      <Route path='schedule' element={ <Schedule />} />
      <Route path='Registration' element={ <Registration />} />
      <Route path='Activities' element={ <Activities />} />
      <Route path='Contact' element={ <Contact />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
