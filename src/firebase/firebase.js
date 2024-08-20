// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKEyrUbY21MFs0-NwmjQTiMyfdsEpeZrA",
  authDomain: "gist-clone.firebaseapp.com",
  projectId: "gist-clone",
  storageBucket: "gist-clone.appspot.com",
  messagingSenderId: "1050558131257",
  appId: "1:1050558131257:web:d40536afc7d6c7941d71e8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);