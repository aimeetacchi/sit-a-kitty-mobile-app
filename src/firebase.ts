// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC1__rH1GmoomddWhGkUyh25h1dH0Kdqu8",
	authDomain: "sit-a-kitty-91d2e.firebaseapp.com",
	projectId: "sit-a-kitty-91d2e",
	storageBucket: "sit-a-kitty-91d2e.firebasestorage.app",
	messagingSenderId: "517088881206",
	appId: "1:517088881206:web:b44c92bb13a5cac85b0697",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
