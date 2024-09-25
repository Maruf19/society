import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Schedule from './pages/Schedule'
import Activities from './pages/Activities'
import Programme from './pages/Programme'
import Team from './pages/Team'
import Registration from './pages/Registration'
import Achievement from './pages/Achievement'
import Leader from './pages/Leader'
import Review from './pages/review'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
//Dashboard Import
import Header from './components/Dashboard/header'
import Sidebar from './components/Dashboard/Sidebar'
import DashHome from './components/Dashboard/DashHome'
import Dashboard from './components/Dashboard/Dashboard'
import HomePage from './components/Dashboard/HomePage'
import AboutPage from './components/Dashboard/AboutPage'
import SchedulePage from './components/Dashboard/SchedulePage'
import FeaturePage from './components/Dashboard/FeaturePage'
import ProgrammePage from './components/Dashboard/ProgrammePage'
import TeamPage from './components/Dashboard/TeamPage'
import LeaderPage from './components/Dashboard/LeaderPage'
import ActivityPage from './components/Dashboard/ActivityPage'
import ContactPage from './components/Dashboard/ContactPage'
import ContactInfo from './components/Dashboard/ContactInfo'
import ReviewPage from './components/Dashboard/ReviewPage'


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
      <Route path='programme' element={ <Programme />} />
      <Route path='Registration' element={ <Registration />} />
      <Route path='Activities' element={ <Activities />} />
      <Route path='Contact' element={ <Contact />} />
      <Route path='Leadership' element={ <Leader />} />
      <Route path='review' element={ <Review />} />
      <Route path='Login' element={ <Login />} />
      <Route path='SignUP' element={ <SignUp />} />
      <Route path='ForgotPassword' element={ <ForgotPassword />} />
       {/* Dashboard Routes */}
       <Route path='header' element={ <Header  />} />
       <Route path='Sidebar' element={ <Sidebar />} />
       <Route path='DashHome' element={ < DashHome />} />
       <Route path='Dashboard' element={ < Dashboard />} />
       <Route path='homePage' element={ < HomePage />} />
       <Route path='aboutPage' element={ < AboutPage />} />
       <Route path='schedulePage' element={ < SchedulePage />} />
       <Route path='featurePage' element={ < FeaturePage />} />
       <Route path='programmePage' element={ < ProgrammePage />} />
       <Route path='teamPage' element={ < TeamPage />} />
       <Route path='leaderPage' element={ < LeaderPage />} />
       <Route path='activityPage' element={ < ActivityPage />} />
       <Route path='contactPage' element={ < ContactPage />} />
       <Route path='contactInfo' element={ < ContactInfo />} />
       <Route path='reviewPage' element={ < ReviewPage />} />
  

    </Routes>
    </BrowserRouter>
  )
}

export default App
