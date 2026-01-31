import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import type { FirebaseOptions } from "firebase/app";

const FirebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAD3yr_HzeNyyHD1sadzopbZPgCLZU88WM",
  authDomain: "club-sponsorship-poc.firebaseapp.com",
  projectId: "club-sponsorship-poc",
  storageBucket: "club-sponsorship-poc.appspot.com",
  messagingSenderId: "1052497809750",
  appId: "G-9HCW17LZZP",
};

const FirebaseApp = initializeApp(FirebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseFirestore = getFirestore(FirebaseApp);
