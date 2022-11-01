import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAki0BIj3kB2acneX2CSdyDXOBHnfpM2_o",
    authDomain: "chainge-15d3c.firebaseapp.com",
    projectId: "chainge-15d3c",
    storageBucket: "chainge-15d3c.appspot.com",
    messagingSenderId: "466260256315",
    appId: "1:466260256315:web:ba9337086acdb06f821e1e"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const auth = app.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();