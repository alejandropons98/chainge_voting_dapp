import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../utils/firebase-config";

import { useEffect } from "react";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    try {
      const infoUsuario = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const docRef = doc(db, "usuarios", infoUsuario.user.email);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();

      setUser({
        id: infoUsuario.user.uid,
        correo: email,
        cedula: userData.cedula,
      });
    } catch (e) {
      console.error("Error: ", e);
    }

  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);
  
  const isLoggedIn = user !== null;

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        isLoggedIn
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
