// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsI5c0SzG6DdBVIuMQA8wV3lPTHheqgSE",
  authDomain: "know-before-you-go.firebaseapp.com",
  projectId: "know-before-you-go",
  storageBucket: "know-before-you-go.firebasestorage.app",
  messagingSenderId: "821822596945",
  appId: "1:821822596945:web:31632e51171ac549e1d570",
  measurementId: "G-E9X9ML0ENP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
