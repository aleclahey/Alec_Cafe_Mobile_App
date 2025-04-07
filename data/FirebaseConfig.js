import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Firestore import

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCJa26RSi0Zlofi9FlioXxYPlSZp1LcIik",
  authDomain: "aleccafeapp.firebaseapp.com",
  projectId: "aleccafeapp",
  storageBucket: "aleccafeapp.firebasestorage.app",
  messagingSenderId: "187919474972",
  appId: "1:187919474972:web:2be80c1e9382d023e29ad9",
  measurementId: "G-GTJJ3VTK8V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db,firebaseConfig }; 
