import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';
import { createContext, useContext, useState, useEffect } from 'react';
import { addUser, checkStatsExist, addUserStats, addFMCToken, addTutorToken } from '../utils/db';

const authContextDefaultValues = {
  user: {},
  login: () => {},
  logout: () => {},
  role: '',
};

const AuthContext = createContext(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();

  const initialState = [];
  const [role, setRole] = useState(initialState);

  useEffect(() => {
    const localRole = JSON.parse(localStorage.getItem('role'));
    const token = JSON.parse(localStorage.getItem('fcm-token'));
    if (localRole) {
      setRole(localRole);
      if (localRole === 'tutor') {addTutorToken(token)}
    }
  }, []);

  useEffect(() => {
    if (role !== initialState) {
      localStorage.setItem('role', JSON.stringify(role));
    }
  }, [role]);

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const token = JSON.parse(localStorage.getItem('fcm-token'));
        setUser(user);
        addUser(user);
        addFMCToken(user.uid, token);
        checkStatsExist(user.uid).then((result) => {
          if (!result) {
            addUserStats(user.uid);
          }
          setRole(result.role);
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
    role,
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
