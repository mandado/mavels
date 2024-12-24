// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6JkW0Drc7PX2BlhZ5H7moFxm2uFIpcrg",
  authDomain: "marvel-e7b58.firebaseapp.com",
  projectId: "marvel-e7b58",
  storageBucket: "marvel-e7b58.firebasestorage.app",
  messagingSenderId: "536964829408",
  appId: "1:536964829408:web:12151112c34e93bcca4085"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
