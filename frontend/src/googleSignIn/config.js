// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBr9AmhIy3wQnp2agaeNV3-TjxIMWBbMGg",
  authDomain: "covidapp-d655a.firebaseapp.com",
  projectId: "covidapp-d655a",
  storageBucket: "covidapp-d655a.appspot.com",
  messagingSenderId: "811380076283",
  appId: "1:811380076283:web:3324f3973578fcf8cfca5e",
  measurementId: "G-VKWP1VMHF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

// const analytics = getAnalytics(app);
const provider=new GoogleAuthProvider();
export {auth,provider};