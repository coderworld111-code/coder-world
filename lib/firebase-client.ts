import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

function cleanEnv(value: string | undefined) {
  if (!value) return undefined;
  // Tolerate Firebase JS config values pasted into .env.local with quotes/commas.
  return value.trim().replace(/,\s*$/, "").replace(/^([\"\'])/, "").replace(/([\"\'])$/, "");
}

const firebaseConfig = {
  apiKey: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  appId: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
};

export function getFirebaseClient() {
  const missingConfig = Object.entries(firebaseConfig).filter(([, value]) => !value).map(([key]) => key);
  if (missingConfig.length) {
    throw new Error(`Firebase client configuration is incomplete. Missing: ${missingConfig.join(", ")}`);
  }

  const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return {
    firebaseApp,
    firebaseAuth: getAuth(firebaseApp),
    googleProvider: new GoogleAuthProvider(),
    firestore: getFirestore(firebaseApp),
    firebaseStorage: getStorage(firebaseApp),
  };
}
