import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import type { FirebaseOptions } from "firebase/app";

const FirebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyABw5prmfxH-9U9wTAk1qe2sqvM3dIxqts",
  authDomain: "clubconnect-mvp-v1.firebaseapp.com",
  projectId: "clubconnect-mvp-v1",
  storageBucket: "clubconnect-mvp-v1.firebasestorage.app",
  messagingSenderId: "109707269735",
  appId: "1:109707269735:web:4eacd6d8a2056876f6e6c2",
};

const FirebaseApp = initializeApp(FirebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseFirestore = getFirestore(FirebaseApp);
