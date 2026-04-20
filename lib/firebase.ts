import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPZlzzKzUqwuTtGl4AVDMn2z9qZBd7o1Q",
    authDomain: "beast-editing.firebaseapp.com",
    projectId: "beast-editing",
    storageBucket: "beast-editing.firebasestorage.app",
    messagingSenderId: "796968750292",
    appId: "1:796968750292:web:ff6ccc483b8fa28840ff41",
    measurementId: "G-Z6VPPRN3D3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
