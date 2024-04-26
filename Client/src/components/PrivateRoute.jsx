import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
 const currentUser = useSelector(state => state.user.currentUser);
  return currentUser? <Outlet /> : <Navigate to='/sign-in' />;
}

export default PrivateRoute