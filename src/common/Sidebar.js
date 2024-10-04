import {
  HomeIcon,
  LogoutIcon,
  UserGroupIcon,
  UsersIcon
} from '@heroicons/react/outline'; // Optional icons, use any icon library you like.
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { apiSlice } from '../store/apiSlice';
import { doLogout } from '../store/authSlice';
import './Sidebar.css';
import { setActiveTab } from '../store/navSlice';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(apiSlice.util.resetApiState());
    dispatch(doLogout());
    navigate('/login');
  }

  return (
    <aside className="w-20 bg-gradient-to-l from-gray-800 to-gray-900 text-white flex flex-col items-center pt-0">
      {/* Logo */}
      <div className="h-16 w-full flex items-center justify-center bg-gray-900">
        <span className="text-2xl font-bold">A</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow space-y-6">
        <ul className="flex flex-col items-center space-y-4 w-full">
          <li className="w-full">
            <NavLink
              onClick={() => {
                dispatch(setActiveTab('Dashboard'))
              }}
              to="/protected/dashboard"
              className="group flex flex-col items-center text-sm py-4 px-4 w-full transition-all hover:bg-gradient-to-r from-blue-500 to-cyan-500"
            >
              <HomeIcon className="h-6 w-6 mb-1 group-hover:text-white transition-all" />
              <span className="group-hover:text-white">Dashboard</span>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to="/protected/users"
              onClick={() => {
                dispatch(setActiveTab('User Management'))
              }}
              className="group flex flex-col items-center text-sm py-4 px-4 w-full transition-all hover:bg-gradient-to-r from-blue-500 to-cyan-500"
            >
              <UsersIcon className="h-6 w-6 mb-1 group-hover:text-white transition-all" />
              <span className="group-hover:text-white">Users</span>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to="/protected/groups"
              onClick={() => {
                dispatch(setActiveTab('Groups'))
              }}
              className="group flex flex-col items-center text-sm py-4 px-4 w-full transition-all hover:bg-gradient-to-r from-blue-500 to-cyan-500"
            >
              <UserGroupIcon className="h-6 w-6 mb-1 group-hover:text-white transition-all" />
              <span className="group-hover:text-white">Groups</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout */}
      <div className="py-4 w-full">
        <a
          href='#'
          onClick={logout}
          className="group flex flex-col items-center text-sm py-3 w-full transition-all hover:bg-gradient-to-r from-red-500 to-red-700 rounded-lg"
        >
          <LogoutIcon className="h-6 w-6 mb-1 group-hover:text-white transition-all" />
          <span className="group-hover:text-white">Logout</span>
        </a>
      </div>
    </aside>
  );
}