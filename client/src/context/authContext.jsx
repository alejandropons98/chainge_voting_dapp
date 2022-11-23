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
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, cedula) => {
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
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
      console.log(docSnap.data());

      setUser({
        id: infoUsuario.user.uid,
        correo: email,
        name: userData.cedula,
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

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthProvider;
