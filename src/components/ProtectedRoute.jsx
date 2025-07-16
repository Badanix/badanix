import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, allowedRoles }) => {
  const isAuthenticated = !!localStorage.getItem('token');  // Check if the user is logged in
  const roleId = parseInt(localStorage.getItem('role_id'), 10);  // Get user role from local storage

  // Case 1: If the user is not authenticated, they can only access /auth-login
  if (!isAuthenticated) {
    if (window.location.pathname === '/auth-login') {
      return <Component />;  // Allow access to login page
    }
    return <Navigate to="/auth-login" />;  // Redirect to login page for other routes
  }

  // Case 2: If the user is authenticated but has no role, they should not be able to access any route that requires a role
  if (!roleId && allowedRoles.length > 0) {
    return <Navigate to="/404" />;  // Redirect to 404 if the user has no role but tries to access a protected route
  }

  // Case 3: If the user has a role, ensure they can't access pages without a role
  if (allowedRoles.length === 0 && roleId) {
    return <Navigate to="/403" />;  // Redirect to forbidden page if a logged-in user with a role tries to access a page without a role
  }

  // Case 4: If the user has a role but the page is not authorized for their role
  if (roleId && !allowedRoles.includes(roleId)) {
    return <Navigate to="/403" />;  // Redirect to forbidden page if role is not allowed
  }

  // Case 5: If authenticated and authorized, render the requested component
  return <Component />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ProtectedRoute;
