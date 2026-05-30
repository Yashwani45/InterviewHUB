import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZXJfzHEL1FRpTFy4aOWwmOxJ7fnYeIEk",
  authDomain: "interviewhubplatform.firebaseapp.com",
  projectId: "interviewhubplatform",
  storageBucket: "interviewhubplatform.firebasestorage.app",
  messagingSenderId: "314991884209",
  appId: "PASTE_EXACT_APP_ID",
  measurementId: "G-XPWST31YV7"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();