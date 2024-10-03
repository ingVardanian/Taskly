// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, setDoc, getDocs, doc, getDoc, collection, updateDoc, arrayUnion } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB09Bu84UQilD47XxmhomOLQg6zoFj53Zs",
  authDomain: "jira-3fce5.firebaseapp.com",
  projectId: "jira-3fce5",
  storageBucket: "jira-3fce5.appspot.com",
  messagingSenderId: "324615740265",
  appId: "1:324615740265:web:e044317aa35249ad1cbbf8",
  measurementId: "G-P2QFL1X7WJ"
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
