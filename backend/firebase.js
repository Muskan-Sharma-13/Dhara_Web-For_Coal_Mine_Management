// Import the necessary functions from Firebase Admin SDK
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtmzgX-Sf2QI9FB4mKNvuYylG1J2yaIaY",
  authDomain: "dhara-3f7a3.firebaseapp.com",
  projectId: "dhara-3f7a3",
  storageBucket: "dhara-3f7a3.appspot.com",
  messagingSenderId: "112091954313",
  appId: "1:112091954313:web:4d6fdcbac51fd3358ada58",
  databaseURL: "https://dhara-3f7a3-default-rtdb.firebaseio.com/",
};

// Initialize Firebase App
const fireApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(fireApp);

module.exports = { fireApp, db };
