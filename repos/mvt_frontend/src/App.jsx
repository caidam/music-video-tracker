import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
// Pages
import HomePage from './pages/HomePage'
import DiscoveryPage from './pages/DiscoveryPage'
import AboutPage from './pages/AboutPage'
import NoPage from './pages/NoPage'
import LoginPage from './pages/LoginPage'
import PrivateRoutes from './utils/PrivateRoutes'
// import SignupPage from './pages/SignupPage'
import SignupPageOtp from './pages/SignUpPageOtp'
import LandingPage from './pages/LandingPage'
import ActivationSuccessPage from './pages/ActivationSuccessPage'
import PasswordResetRequestPage from './pages/PasswordResetRequestPage'
import PasswordResetConfirmPage from './pages/PasswordResetConfirmPage'
import TrackFocusPage from './pages/TrackFocusPage'
import { Toaster } from 'sonner'
import { useMediaQuery } from './hooks/ScreenSizeComponent'

const App = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      {/* <BrowserRouter basename="/project-project-front/"> */}
      <Router>
        <AuthProvider>

          {/* <HeaderComponent/> */}

            <Routes>

              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPageOtp />} />
              <Route path='/landing' element={<LandingPage />} />
              <Route path='/activate/:uid/:token' element={<ActivationSuccessPage />} />
              <Route path="/request-password-reset" element={<PasswordResetRequestPage />} />
              <Route path="/reset-password-confirm/:uidb64/:token" element={<PasswordResetConfirmPage />} />

              
              <Route element={<PrivateRoutes />}>
                <Route path='*' element={<NoPage />} />
                <Route index element={<HomePage />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/analytics/focus/:source_id' element={<TrackFocusPage />} />
                <Route path='/discovery' element={<DiscoveryPage />} />
                <Route path='/about' element={<AboutPage />} />
              </Route>

            </Routes>


        </AuthProvider>
      </Router>
      {/* </BrowserRouter> */}
      <Toaster position={isMobile ? "top-center" : "bottom-right"} richColors closeButton className="pointer-events-auto" />
    </div>
  )
}

export default App