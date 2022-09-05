import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from './login'
import LoadingComp from '../Components/Loading.comp'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

  const [user,loading] = useAuthState(auth)

  useEffect(()=>{
    if(user){
      setDoc(doc(db,"users",user.uid),{email:user.email,lastSeen : serverTimestamp(), photoURL:user.photoURL },{merge:true})
    }
  },[user])


  if(loading) return <LoadingComp/>
  if (!user) return <Login/>
  return <Component {...pageProps} />
}

export default MyApp
