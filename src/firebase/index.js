import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhLVz-F3V7IF5NMyce0AEmA98WR92glcs",
  authDomain: "summative-565d6.firebaseapp.com",
  projectId: "summative-565d6",
  storageBucket: "summative-565d6.appspot.com",
  messagingSenderId: "974101694409",
  appId: "1:974101694409:web:ba6943213fbf183bcf0a18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
