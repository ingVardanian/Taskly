// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, setDoc, getDocs, doc, getDoc, collection, updateDoc, arrayUnion } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyYueOdL2HbB7abr34-1a6xlAxgoaZ_Ck",
  authDomain: "ardent-time-227417.firebaseapp.com",
  projectId: "ardent-time-227417",
  storageBucket: "ardent-time-227417.appspot.com",
  messagingSenderId: "847111551589",
  appId: "1:847111551589:web:802936670da35d346c248c",
  measurementId: "G-T7M3JN9467"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 


export {
    app, 
    auth,
    db, 
    updateDoc, 
    getDocs, 
    getDoc, 
    collection, 
    getFirestore, 
    setDoc, 
    doc, 
    arrayUnion,
    onAuthStateChanged
}
