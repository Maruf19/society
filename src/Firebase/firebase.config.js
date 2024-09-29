// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);