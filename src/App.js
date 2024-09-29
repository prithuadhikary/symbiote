import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './features/login';
import AdminDashboard from './features/dashboard';
import Signup from './features/signup';
import { PrivateRoutes } from './common/PrivateRoute';
import UsersPage from './features/users';

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/login" />} />
      <Route path='/login/:signedUp?' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/dashboard' element={<AdminDashboard />}>
          <Route path='users' element={<UsersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
