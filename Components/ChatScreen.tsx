import { AttachFileRounded, InsertEmoticon, MoreVert } from '@mui/icons-material'
import { Avatar, Button, IconButton } from '@mui/material'
import { addDoc, collection, doc, documentId, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import getReceipentEmail from '../utils/getReceipentEmail'
import Message from './Message'

const ChatScreen = ({chat, messages}) => {

  console.log({chat,messages})
  const [user]= useAuthState(auth)
  const [input,setInput] =  useState("")
  const {query:{id}} =  useRouter();
  const undefinedAndArrayreducer =  (id) => {if(id){
    if(Array.isArray(id)){
      return id[0]
    }
    return id
  }else return ""}
  const chatRef = doc(db, "chats",undefinedAndArrayreducer(id));
  
  const [messagesSnapshot] = useCollection(query(collection(chatRef,"messages"),where(documentId(),"==",id) ,orderBy("timestamp", "asc")))
  

  const showMessages =  () => {

    console.log("snapshot",messagesSnapshot)

    
    if(messagesSnapshot){
      return messagesSnapshot.docs.map(message=> <Message
        key={message.id}
        user ={message.data().user}
        message={{...message.data(),timestamp:message.data().timestamp.toDate().getTime()}}
        />
    )}
    else{
      return JSON.parse(messages).map(message=> {
      return <Message
        key={message.id}
        user ={message.user}
        message={{...message,timestamp:message.timestamp}}
        />})}
    }
  


  const sendMessage = async (e)=>{
    if(!user) return 
    if(!id || typeof id ==="object") return 
    e.preventDefault();
    console.log(id)
    await setDoc(doc(db, "users", user.uid),{lastSeen: serverTimestamp()}, {merge:true})
    
    await addDoc(collection(chatRef,"messages"),{
      timestamp:serverTimestamp(),
      message:input,
      user:user.email,
      photoURL: user.photoURL
    })
    setInput("")
  }
  return (
    <Container>
      <Header>
        <Avatar/>
        <HeaderInformation>
          <h3>{getReceipentEmail(chat.users,user)}</h3>
          <p>Last Active:</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileRounded/>
          </IconButton>
          <IconButton>
            <MoreVert/>
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage/>
      </MessageContainer>

      <InputContainer>
      <InsertEmoticon/>
      <Input value={input} onChange={(e)=> setInput(e.target.value)}/>
      <Button hidden disabled={!input} type="submit" onClick={sendMessage}> Send Message</Button>
      </InputContainer>
    </Container>
  )
}
const EndOfMessage=styled.div``

const InputContainer = styled.form`
display: flex;
align-items:center;
padding:1rem;
position:sticky;
bottom:0;
background-color:white;
z-index: 100;
`
const Input=styled.input`
flex:1;
align-items:center;
outline:0;
border-radius: 1rem;
padding: 1rem;
background-color:whitesmoke;
z-index:100;
margin:0 1rem;`

const MessageContainer =  styled.div`
padding:2rem;
background-color: #e5ded8;
min-height: 90vh;
`
const Container =  styled.div``
const Header =  styled.div`
position:sticky;
background-color:white;
z-index: 100;
top:0;
display: flex;
justify-content :space-between;
align-items: center;
padding:1rem;
`
const HeaderInformation =  styled.div`
margin-left:1rem;
flex:1;
 > h3{
  margin-bottom: 1rem;
 }
 > p{
  font-size: 0.9rem;
  color:gray;
}
`

const HeaderIcons =  styled.div``

export default ChatScreen