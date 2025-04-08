import { Outlet, Navigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

interface IUserData {
  name: string;
  email: string;
}

const ProtectedRoutes = () => {
    const authUser = useAuthUser<IUserData>();
    return authUser ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoutes;
