/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDlPMtkAdZpOGVNvW9Pe5y1WVhlIjM0850",
    authDomain: "blog-ping-social.firebaseapp.com",
    projectId: "blog-ping-social",
    storageBucket: "blog-ping-social.appspot.com",
    messagingSenderId: "521458369275",
    appId: "1:521458369275:web:5699b6206f68e856bd265e",
    measurementId: "G-FCKDX0PG0C"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();