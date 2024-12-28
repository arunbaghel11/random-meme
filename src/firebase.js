// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth
import { getFirestore } from "firebase/firestore"; // Import getFirestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFuXXnXouD6YMM9iMD7iWk-Q7DZxf5ANw",
  authDomain: "fire-base-project-971f8.firebaseapp.com",
  projectId: "fire-base-project-971f8",
  storageBucket: "fire-base-project-971f8.firebasestorage.app",
  messagingSenderId: "594823971649",
  appId: "1:594823971649:web:74218bda15185cfdf397c0",
  measurementId: "G-YVR42KSYTM"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);