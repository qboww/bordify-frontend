// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfUNAwJlJbaaeJj4rRukJ10YAWLwwFeqQ",
  authDomain: "bordify-be337.firebaseapp.com",
  projectId: "bordify-be337",
  storageBucket: "bordify-be337.firebasestorage.app",
  messagingSenderId: "335144135260",
  appId: "1:335144135260:web:5fe5568a3af2f9b2ce5499",
  measurementId: "G-VBCR7R9P1G"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);