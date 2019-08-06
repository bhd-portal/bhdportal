import React, { createContext, useMemo, useState } from 'react';
import AccessTokenManger from '../utils/token.utils';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const redirectToLogin = () => {
    // Todo: Redirect to login using window.location (if it's external login service)
    //  or history.push if it's not.
  };
  const fetchTokenDetails = async accessToken => {
    try {
      // Todo: fetch user details from the backend
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const api = {
    logout: async () => {
      try {
        setUser(null);
        redirectToLogin();
      } catch (e) {}
    },
    checkIfLoggedInOrRedirectToLogin: async () => {
      const accessToken = AccessTokenManger.getAccessToken();
      if (accessToken) {
        try {
          const user = await fetchTokenDetails(accessToken);
          setUser(user);
        } catch (e) {
          redirectToLogin();
        }
      } else {
        redirectToLogin();
      }
    }
  };
  const value = useMemo(() => ({ user, ...api }), [user, api]);
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;