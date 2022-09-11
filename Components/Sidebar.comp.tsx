import { Avatar, Button, Tooltip } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { MoreVert, ChatBubbleOutline, Search as SearchI, Logout } from '@mui/icons-material';
import * as Emailvalidator from "email-validator"
import { auth, db } from '../firebase';
import { addDoc, collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from "react-firebase-hooks/firestore"
import ChatComp from './Chat.comp';
const Sidebar = () => {

    const [user] = useAuthState(auth)
    const userChatRef = query(collection(db, "chats"), where("users", "array-contains", user?.email))
    const [chatsSnap] = useCollection(userChatRef)


    const createChat = async () => {
        const input = prompt("Please enter an email for the user you with to chat with")

        if (!input) return;

        if (Emailvalidator.validate(input) && input !== user?.email && !chatAlreadyExists(input)) {
            await addDoc(collection(db, "chats"), {
                users: [user?.email, input]
            })
        }

    }

    const signout = () => auth.signOut();

    const chatAlreadyExists = (receiptEmailAddress: string): boolean => !!chatsSnap?.docs.find(chat => chat.data().users.find((u: any) => u === receiptEmailAddress)?.length > 0)

    return (
        <Container>
            <Header>
                <UserAvatar />
                <IconsContainer>
                    <Tooltip title="Logout">
                        <Logout onClick={signout} />
                    </Tooltip>
                </IconsContainer>

            </Header>
            <Search>
                <SearchI />
                <SearchInput placeholder="Search in chats" />
            </Search>
            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
            {/* List of Chats */}
            {chatsSnap?.docs.map((chat) => {
                return <ChatComp key={chat.id} id={chat.id} users={chat.data().users} />
            })}
        </Container>
    )
}



export default Sidebar;

const Container = styled.div`

flex:0.45;
border-right: 1px solid whitesmoke;
height:100vh;
min-width: 300px;
max-width:350px;
overflow:scroll;

::-webkit-scrollbar{
    display: none;
}

-ms-overflow-style: none;
scrollbar-width:none;
`;

const Search = styled.div`
display:flex;
align-items: center;
padding:1rem;
border-radius:5px;
`

const Header = styled.div`
display:flex;
position:sticky;
top:0;
background-color:white;
z-index:1;
justify-content:space-between;
align-items:center;
padding:1rem;
height:5rem;
border-bottom:1px solid whitesmoke;
`;


const SearchInput = styled.input`
outline-width:0;
border:none;
flex:1;
`

const SidebarButton = styled(Button)`
width:100%;

&&&{

    border-top:1px solid whitesmoke;
border-bottom: 1px solid whitesmoke;
}
`

const UserAvatar = styled(Avatar)`
cursor:pointer;
:hover{
    opacity:0.8;
}

`;

const IconsContainer = styled.div``;
