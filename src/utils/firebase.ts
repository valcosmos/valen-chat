import { getApp, getApps, initializeApp } from 'firebase/app'
import type { FirebaseOptions } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Import the functions you need from the SDKs you need

import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_F_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_F_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_F_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_F_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_F_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_F_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_F_MEASUREMENT_ID
}

console.log('==>', firebaseConfig)

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)
