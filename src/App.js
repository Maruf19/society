import React from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import PrivateRoute from './Router/PrivateRoute';
import { AuthProvider } from './Firbase/authContext';

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
