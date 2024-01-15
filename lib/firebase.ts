import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDHDVFiRwIq2qsgQrCBxwIpMDJ33T2xctk',
  authDomain: 'chatgpt-messenger-f992c.firebaseapp.com',
  projectId: 'chatgpt-messenger-f992c',
  storageBucket: 'chatgpt-messenger-f992c.appspot.com',
  messagingSenderId: '279704139803',
  appId: '1:279704139803:web:bc802d7f5fcb6d3a2ba0be',
}

// Initialize Firebase

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }
