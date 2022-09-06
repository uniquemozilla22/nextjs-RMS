import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth } from '../firebase'

const ChatScreen = ({chat, messages}) => {

  const [user]= useAuthState(auth)

  const router =  useRouter()
  return (
    <div>ChatScreen</div>
  )
}


const Container =  styled.div``

export default ChatScreen