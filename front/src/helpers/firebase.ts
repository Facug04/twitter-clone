import { initializeApp } from 'firebase/app'

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,

  authDomain: import.meta.env.VITE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_PROJECT_ID,

  storageBucket: import.meta.env.VITE_STORAGE,

  messagingSenderId: import.meta.env.VITE_MESSASING,

  appId: import.meta.env.VITE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const singInGoogle = async (googleProvider: GoogleAuthProvider) => {
  await signInWithPopup(auth, googleProvider)
}

export const logOut = async () => {
  await signOut(auth)
}
