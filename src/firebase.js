import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC1lLA9GVLgewAKIY_6XBs_3-P8QAHKBao",
  authDomain: "a703-6e76b.firebaseapp.com",
  projectId: "a703-6e76b",
  storageBucket: "a703-6e76b.firebasestorage.app",
  messagingSenderId: "42367550644",
  appId: "1:42367550644:web:f963225c19d7793c11c3e1",
  measurementId: "G-0ERXK5N5SX",
};

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
