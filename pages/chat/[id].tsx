import { collection, CollectionReference, doc, documentId, DocumentSnapshot, getDoc, getDocs, limitToLast, orderBy, query, QuerySnapshot, where } from 'firebase/firestore'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Sidebar from '../../Components/Sidebar.comp'
import { auth, db } from '../../firebase'
import ChatScreen from '../../Components/ChatScreen'
import getReceipentEmail from '../../utils/getReceipentEmail'
import { useAuthState } from 'react-firebase-hooks/auth'

interface ChatPagePropsI {
    messages: string,
    chat: {
        id: string,
        users:string[]
    }
}

const ChatPage = ({ chat, messages }: ChatPagePropsI) => {

    const [user]= useAuthState(auth);
    return (
        <Container>
            <Head>
                <title>{getReceipentEmail(chat.users, user)}</title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages} />
            </ChatContainer>
        </Container>
    )
}


export const getServerSideProps = async (context: { query: { id: string } }) => {

    const Chatreference: CollectionReference  = collection(db, "chats")
    const messegesRes: QuerySnapshot = await getDocs(query(Chatreference, orderBy("timestamp", "asc")))
    const messages = messegesRes.docs.map((data) => ({
        id: data.id,
        ...data.data()
    })).map((message) => ({
        ...message,
        timestamp: message.timestamp.toDate().getTime()
    }))
    const chatRes:DocumentSnapshot = await getDoc(doc(db, "chats", context.query.id))
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }
    return {
        props: {
            messages: JSON.stringify(messages),
            chat
        }
    }
}

const Container = styled.div`
display: flex;
`


const ChatContainer = styled.div`
flex:1;
overflow: scroll;
height:100vh;
::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: scrollbar;


`
export default ChatPage