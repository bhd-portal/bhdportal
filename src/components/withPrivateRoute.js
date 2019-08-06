import React, { useEffect, useContext } from 'react';
import { AuthContext } from './AuthProvider';

const withPrivateRoute = WrappedComponent => props => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext && !authContext.user) {
      authContext.checkIfLoggedInOrRedirectToLogin();
    }
  }, [authContext]);

  return <WrappedComponent {...props} />;
};
export default withPrivateRoute;