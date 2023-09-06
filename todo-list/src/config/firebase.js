// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdx-Gs5CcooJf5yNm6_pnvzQo5YCx-I_w",
  authDomain: "todo-list-3307e.firebaseapp.com",
  projectId: "todo-list-3307e",
  storageBucket: "todo-list-3307e.appspot.com",
  messagingSenderId: "993023680855",
  appId: "1:993023680855:web:0215f57f133c44e8a4de12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);