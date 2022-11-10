import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../utils/firebase-config";
import { useEffect } from "react";
export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};
//=========================================================================
export function AuthProvider({ children }) {
  const [userx, setUserx] = useState(null);

  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUserx(currentUser);
    });
  }, []);
  return (
    <authContext.Provider value={{ signup, login, userx, logOut }}>
      {children}
    </authContext.Provider>
  );
}
