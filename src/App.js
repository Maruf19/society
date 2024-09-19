import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Schedule from './pages/Schedule'
import Activities from './pages/Activities'
import Team from './pages/Team'
import Registration from './pages/Registration'
import Achievement from './pages/Achievement'
import Leader from './pages/Leader'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
function App() {
  return (
        <BrowserRouter>
    <Routes>
      <Route index element={ <Home />} />
      <Route path='Home' element={ <Home />} />
      <Route path='About' element={ <About />} />
      <Route path='team' element={ <Team />} />
      <Route path='schedule' element={ <Schedule />} />
      <Route path='Achievement' element={ <Achievement />} />
      <Route path='Registration' element={ <Registration />} />
      <Route path='Achievement' element={ <Achievement />} />
      <Route path='Activities' element={ <Activities />} />
      <Route path='Contact' element={ <Contact />} />
      <Route path='Leadership' element={ <Leader />} />
      <Route path='Login' element={ <Login />} />
      <Route path='SignUP' element={ <SignUp />} />
      <Route path='ForgotPassword' element={ <ForgotPassword />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
