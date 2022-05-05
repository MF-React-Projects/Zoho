// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQypTm6pCY_lQKF9ignhmhx4VURcqoEIM",
    authDomain: "zoho-26c66.firebaseapp.com",
    projectId: "zoho-26c66",
    storageBucket: "zoho-26c66.appspot.com",
    messagingSenderId: "461988127226",
    appId: "1:461988127226:web:cd94d8da9a27fb8720c443"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;