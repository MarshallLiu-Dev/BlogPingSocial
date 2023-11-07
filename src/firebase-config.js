// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore}from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlPMtkAdZpOGVNvW9Pe5y1WVhlIjM0850",
    authDomain: "blog-ping-social.firebaseapp.com",
    projectId: "blog-ping-social",
    storageBucket: "blog-ping-social.appspot.com",
    messagingSenderId: "521458369275",
    appId: "1:521458369275:web:5699b6206f68e856bd265e",
    measurementId: "G-FCKDX0PG0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();