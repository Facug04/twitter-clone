import { initializeApp } from 'firebase/app'

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCe5jStXXeznhp6iVLynajVGMmZ6dZq9Q0',

  authDomain: 'red-social-45f01.firebaseapp.com',

  projectId: 'red-social-45f01',

  storageBucket: 'red-social-45f01.appspot.com',

  messagingSenderId: '683641337413',

  appId: '1:683641337413:web:e1b88d5d762d2cfa76552c',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const singInGoogle = async (googleProvider: GoogleAuthProvider) => {
  await signInWithPopup(auth, googleProvider)
}

export const logOut = async () => {
  await signOut(auth)
}
