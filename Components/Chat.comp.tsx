import { Avatar } from '@mui/material'
import { collection, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import getReceipentEmail from '../utils/getReceipentEmail'


interface IProps{
    id:string,
    users: {
      photoURL: string,
      email:string
    },
}

const ChatComp = ({id,users}:IProps) => {
  const router = useRouter()

  const enterChat  = () =>{
    router.push(`/chat/${id}`)
  }

  const [user] = useAuthState(auth)
  const [receipentSnap] = useCollection(query(collection(db,"users"),where("email","==",getReceipentEmail(users,user))))

  const receipent =  receipentSnap?.docs?.[0]?.data()

  const receipientEmail = getReceipentEmail(users,user)
  return (
    <Container onClick={enterChat}>
      {
        receipent?<UserAvatar src={receipent?.photoURL}/>:<UserAvatar>{receipientEmail[0]}</UserAvatar>
      }
        <p>{receipientEmail}</p>
    </Container>
  )
}


const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding:1rem;
word-break:break-word;
:hover{
    background-color:"#e9eaeb"
}`

const UserAvatar = styled(Avatar)`
margin :0 1rem;`
export default ChatComp