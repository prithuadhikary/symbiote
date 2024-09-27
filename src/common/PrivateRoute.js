import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectProfile } from '../store/authSlice';


export const PrivateRoutes = () => {
    const profile = useSelector(selectProfile);

    return (
        profile ? <Outlet /> : <Navigate to='/login' />
    )
}
