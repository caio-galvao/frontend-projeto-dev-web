import { Navigate, Route, Routes } from 'react-router-dom'
import PageLayout from './Layouts/PageLayout/PageLayout'
import AuthPage from './pages/AuthPage/AuthPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import BuildingPage from './pages/BuildingPage/BuildingPage'
import RoomView from './pages/Room/RoomView'


function App() {
  const user = false;

  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/buildings" element={<BuildingPage />} />
        <Route path="/room/:id" element={<RoomView />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
