// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "job-pilot-8ed26.firebaseapp.com",
  projectId: "job-pilot-8ed26",
  storageBucket: "job-pilot-8ed26.appspot.com",
  messagingSenderId: "278079822581",
  appId: "1:278079822581:web:a9f08f7671b05b5c71c3bc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);