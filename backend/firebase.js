// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./env.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
