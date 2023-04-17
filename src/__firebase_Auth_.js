// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXGIKnvx_oTYC8zpyJlSNcar-JNIKRQis",
  authDomain: "foot-frenzy-auth.firebaseapp.com",
  projectId: "foot-frenzy-auth",
  storageBucket: "foot-frenzy-auth.appspot.com",
  messagingSenderId: "474278640321",
  appId: "1:474278640321:web:7c4fee50e31937b87df240"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;