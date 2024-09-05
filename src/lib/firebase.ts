// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_d9-cE60AbDY5HcIK3DbGSREKiNA1POg",
  authDomain: "k-room-be.firebaseapp.com",
  projectId: "k-room-be",
  storageBucket: "k-room-be.appspot.com",
  messagingSenderId: "518008973117",
  appId: "1:518008973117:web:0e66445f32e5550928c754",
  measurementId: "G-CW54RNZFPL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
