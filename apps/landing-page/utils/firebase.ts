import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-XXXywfeHboO0BZqVjS83dtaRWxq62tI",
  authDomain: "drawsync-9f313.firebaseapp.com",
  projectId: "drawsync-9f313",
  storageBucket: "drawsync-9f313.firebasestorage.app",
  messagingSenderId: "114859643923",
  appId: "1:114859643923:web:52b44f046a2505361adbe6",
  measurementId: "G-LF19CHQX1P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
