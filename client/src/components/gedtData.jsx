import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase-config";
import LoginForm from "./LoginForm";
export const getData = async () => {
  const docRef = doc(db, "usuarios", "cedula");
  const docSnap = await getDoc(docRef);
  const userData = docSnap.data();
  console.log(userData.cedula);
};
