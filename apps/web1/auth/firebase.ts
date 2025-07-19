import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5vUfuOoKad9ELTsv1fq8uPELVHCsQ8Hs",
  authDomain: "testing-4208f.firebaseapp.com",
  projectId: "testing-4208f",
  storageBucket: "testing-4208f.firebasestorage.app",
  messagingSenderId: "182471613192",
  appId: "1:182471613192:web:bd29ca07f32349ed99aabd",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
