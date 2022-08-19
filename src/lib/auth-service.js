import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';
import { createContext, useContext, useState, useEffect } from 'react';
import { addUser, checkStatsExist, addUserStats } from '../utils/db';

const authContextDefaultValues = {
  user: {},
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        addUser(user);
        checkStatsExist(user.uid).then((result) => {
          if (!result) {
            addUserStats(user.uid);
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
      });
  };

  const logout = () => {
    auth.signOut();
    setUser(false);
    console.log('logout');
  };

  const value = {
    user,
    login,
    logout,
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
