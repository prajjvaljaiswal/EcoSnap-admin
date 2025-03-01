// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDLAtzV0FrERNrVGE8KWCYZ0NXmUj2aEw",
  authDomain: "threads-cfeda.firebaseapp.com",
  databaseURL: "https://threads-cfeda-default-rtdb.firebaseio.com",
  projectId: "threads-cfeda",
  storageBucket: "threads-cfeda.appspot.com",
  messagingSenderId: "90146708690",
  appId: "1:90146708690:web:f25806d3f46b33d4cbe10b",
  measurementId: "G-SFFWTEVE1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);