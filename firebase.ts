import {initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth , GoogleAuthProvider} from "firebase/auth";

console.log(process.env.NODE_ENV , process.env.messagingSenderId)


const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain:process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

// Initialize Firebase
export const app =  initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth =  getAuth()
const provider =  new GoogleAuthProvider()


export {db, auth, provider}