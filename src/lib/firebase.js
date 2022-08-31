// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { SeadDatabase } from "../sead";
const firebaseConfig = {
  apiKey: "AIzaSyB13QYGArWXuF43pvD9y2HZbIQoLra3KfQ",
  authDomain: "instagram-84ee7.firebaseapp.com",
  projectId: "instagram-84ee7",
  storageBucket: "instagram-84ee7.appspot.com",
  messagingSenderId: "739879673112",
  appId: "1:739879673112:web:9b619dab7a09fa87a6526d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

console.log(app ,auth)

// SeadDatabase(db)

export { auth,app  , db}
