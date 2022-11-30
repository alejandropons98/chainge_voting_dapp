import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../utils/firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { useEffect } from "react";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (email, password, cedula, rol) => {

    setLoading(true);

    try {
      const infoUsuario = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "usuarios", infoUsuario.user.email), {
        name,
        correo: email,
        cedula,
        rol,
        //rol
      });

      setUser({
        id: infoUsuario.user.uid,
        //id: "17cgV8GIFEPIKuMqEMdr3zGFNFp2",
        name,
        //name: "Lionel Andrés",
        correo: email,
        //correo: "app@gmail.com",
        //rol,
        cedula,
        rol,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setLoading(true);
  };

  const login = async (email, password) => {

    setLoading(true);

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
        rol: userData.rol,
      });
    } catch (e) {
      console.error("Error: ", e);
    }

    setLoading(false);

  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, async (currentUser) => {
      const docRef = doc(db, "usuarios", currentUser.email);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      setUser({
        correo: email,
        cedula: userData.cedula,
        rol: userData.rol,
      });
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  const isLoggedIn = user !== null;

  const isAdmin = isLoggedIn && user.rol === "admin";

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        isLoggedIn,
        isAdmin,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
