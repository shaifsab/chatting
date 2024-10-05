import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCCsctIwE7qjC40TEMeAbk38UybL9wYIkE",
  authDomain: "chatting-app-c349f.firebaseapp.com",
  projectId: "chatting-app-c349f",
  storageBucket: "chatting-app-c349f.appspot.com",
  messagingSenderId: "941832530697",
  appId: "1:941832530697:web:396b2bf995362ebab801d8",
  measurementId: "G-9XXG8BVRCE",
  databaseURL: "https://chatting-app-c349f-default-rtdb.asia-southeast1.firebasedatabase.app" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
