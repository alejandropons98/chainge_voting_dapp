import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLMbmvCN3HvlWXs1vNiPR86n0QQeg1xfw",
  authDomain: "chainge-a404c.firebaseapp.com",
  projectId: "chainge-a404c",
  storageBucket: "chainge-a404c.appspot.com",
  messagingSenderId: "434459601529",
  appId: "1:434459601529:web:e6015cec51db5983f482a8",
  measurementId: "G-B92SPLEKSH",
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const auth = app.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
