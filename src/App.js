import React from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './Router/PrivateRoute';
import { AuthProvider } from './Firbase/authContext'; 

// User Interface Imports
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Schedule from './pages/Schedule';
import Activities from './pages/Activities';
import Programme from './pages/Programme';
import Team from './pages/Team';
import Registration from './pages/Registration';
import Achievement from './pages/Achievement';
import Leader from './pages/Leader';
import Review from './pages/review';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset';

// Dashboard Imports
import Dashboard from './components/Dashboard/Dashboard';
import HomePage from './components/Dashboard/HomePage';
import AboutPage from './components/Dashboard/AboutPage';
import MissionVision from './components/Dashboard/MissionVision';
import SchedulePage from './components/Dashboard/SchedulePage';
import FeaturePage from './components/Dashboard/FeaturePage';
import LeaderPage from './components/Dashboard/LeaderPage';
import TeamPage from './components/Dashboard/TeamPage';
import ProgrammePage from './components/Dashboard/ProgrammePage';
import ActivityPage from './components/Dashboard/ActivityPage';
import ContactPage from './components/Dashboard/ContactPage';
import ContactInfo from './components/Dashboard/ContactInfo';
import ReviewPage from './components/Dashboard/ReviewPage';

function App() {
  return (
    <AuthProvider> {/* Wrap your app with AuthProvider */}
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/programme" element={<Programme />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/leadership" element={<Leader />} />
          <Route path="/achievement" element={<Achievement />} />

          {/* Dashboard - Admin Only Routes */}
          <Route element={<PrivateRoute isAdmin />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/aboutpage" element={<AboutPage />} />
            <Route path="/missionvision" element={<MissionVision />} />
            <Route path="/schedulepage" element={<SchedulePage />} />
            <Route path="/featurepage" element={<FeaturePage />} />
            <Route path="/leaderPage" element={<LeaderPage />} />
            <Route path="/teamPage" element={<TeamPage />} />
            <Route path="/programmePage" element={<ProgrammePage />} />
            <Route path="/activityPage" element={<ActivityPage />} />
            <Route path="/contactPage" element={<ContactPage />} />
            <Route path="/contactInfo" element={<ContactInfo />} />
            <Route path="/reviewPage" element={<ReviewPage />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/review" element={<Review />} />
          </Route>

          {/* Redirect all unmatched paths to Login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
