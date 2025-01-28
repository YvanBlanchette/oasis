// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfrJmxoy-tUjL8yJ6TCwx1aqAMp3HB6fA",
  authDomain: "oasis-bef94.firebaseapp.com",
  projectId: "oasis-bef94",
  storageBucket: "oasis-bef94.firebasestorage.app",
  messagingSenderId: "326261794314",
  appId: "1:326261794314:web:1c3625335f74a32b3121f3",
  measurementId: "G-YF2HDRQF66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
