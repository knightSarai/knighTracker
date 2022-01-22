import { Navigate, Outlet } from 'react-router-dom';
import { useTypedSelector } from '@hooks/';

const ProtectedRoute: React.FC = () => {
  const { user } = useTypedSelector((state) => state);

  return user.isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
