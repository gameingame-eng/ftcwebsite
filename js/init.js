// js/init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAPkIzG-SizoyPtvFU_9hsYWAoiayV7rM",
  authDomain: "team-citrix.firebaseapp.com",
  projectId: "team-citrix",
  storageBucket: "team-citrix.firebasestorage.app",
  messagingSenderId: "934131014780",
  appId: "1:934131014780:web:c5dc0865fd26dde00f3df9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Export db so other files can use it
export { db }