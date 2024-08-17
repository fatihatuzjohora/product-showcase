// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpkkPxMUojCVXEwXtfIAoFvRoO60fsFOI",
  authDomain: "marketmingle-27797.firebaseapp.com",
  projectId: "marketmingle-27797",
  storageBucket: "marketmingle-27797.appspot.com",
  messagingSenderId: "276282357848",
  appId: "1:276282357848:web:689fcc022c21fa71bcb22d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app