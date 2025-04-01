import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate, Route, Routes } from 'react-router-dom'
import PageLayout from './Layouts/PageLayout/PageLayout'
import { auth } from './firebase/firebase'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

function App() {

  const [authUser] = useAuthState(auth);

  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/:username" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  )
}

export default App
