// import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate, Route, Routes } from 'react-router-dom'
import PageLayout from './Layouts/PageLayout/PageLayout'
// import { auth } from './firebase/firebase'
import AuthPage from './pages/AuthPage/AuthPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import a from './pages/a/ProfilePage'

// function App() {
//   const { user } = useAuthStore();

//   return (
//     <PageLayout>
//       <Routes>
//         <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
//         <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
//         <Route path="/:username" element={<ProfilePage />} />
//       </Routes>
//     </PageLayout>
//   );
// }

// export default App

function App() {
  const user = false;

  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="/profile" element={!user ? <HomePage /> : <Navigate to="/profile" />} />
        <Route path="/:username" element={<a />} /> */}
      </Routes>
    </PageLayout>
  );
}

export default App;
