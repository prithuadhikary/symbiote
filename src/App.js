import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './features/login';
import AdminDashboard from './features/dashboard';
import Signup from './features/signup';

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/login" />} />
      <Route path='/login/:signedUp?' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
