import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { PrivateRoutes } from './common/PrivateRoute';
import { Dashboard } from './features/dashboard';
import Login from './features/login';
import ProtectedPage from './features/protectedpage';
import Signup from './features/signup';
import UsersPage from './features/users';
import { GroupsPage } from './features/groups';

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/login" />} />
      <Route path='/login/:signedUp?' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/protected' element={<ProtectedPage />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='users' element={<UsersPage />} />
          <Route path='groups' element={<GroupsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
