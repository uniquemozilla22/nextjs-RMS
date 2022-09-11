import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth } from '../firebase'
import moment from 'moment'

const Message = ({ user, message }: any) => {

  const [userLoggedIn] = useAuthState(auth)

  const TypeofMessage = user === userLoggedIn?.email ? Sender : Receiver

  return (
    <Container>
      <TypeofMessage>
        {message.message}
        <TimeStamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </TimeStamp>
      </TypeofMessage></Container>
  )
}


const Container = styled.div``;


const MessageElement = styled.p`
width:fit-content;
padding:15px;
border-radius:8px;
margin:10px;
min-width:80px;
padding-bottom:26px;
position:relative;
text-align:right;`;


const Sender = styled(MessageElement)`
  margin-left:auto;
  background-color: #dcf8c6;

`
const TimeStamp = styled.span`
font-size:0.7rem;

position:absolute;
bottom:10px;
right:10px;
`

const Receiver = styled(MessageElement)`
  background-color:whitesmoke;
  text-align:left;
`


export default Message