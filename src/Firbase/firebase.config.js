import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCligAzzdYKRXyXrSFTD9Gag05uurQw2V8",
  authDomain: "cse-society-2a318.firebaseapp.com",
  projectId: "cse-society-2a318",
  storageBucket: "cse-society-2a318.appspot.com",
  messagingSenderId: "719465737277",
  appId: "1:719465737277:web:6509d3d424262379290e54",
  measurementId: "G-ZQHC5B7RLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const firestore = getFirestore(app); // Initialize Firestore

// Export app, auth, and firestore as named exports
export { app, auth, firestore };
