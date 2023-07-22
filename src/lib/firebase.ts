import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

export const currentUser = writable<User | null>(null);

onAuthStateChanged(auth, (user) => {
  currentUser.set(user)
})

export const userData = writable<any>(null);

currentUser.subscribe((user) => {
  if (user) {
    const docRef = doc(db, `users/${user.uid}`);
    onSnapshot(docRef, (snapshot) => {
      userData.set(snapshot.data());
    })
  }
})