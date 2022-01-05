import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyB-AEup-yOl6EM0dhhuKE04uYhEvDRh0_M",
  authDomain: "todo-20106.firebaseapp.com",
  projectId: "todo-20106",
  storageBucket: "todo-20106.appspot.com",
  messagingSenderId: "421894344563",
  appId: "1:421894344563:web:60b2a4d785fe5bd3153f06",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
