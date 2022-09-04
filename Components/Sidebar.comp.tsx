import { Avatar, Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import {MoreVert,ChatBubbleOutline, Search as SearchI} from '@mui/icons-material';

const Sidebar = () => {
  return (
    <Container>
        <Header>
            <UserAvatar/>
            <IconsContainer>
                <ChatBubbleOutline/>
                <MoreVert/>
            </IconsContainer>

        </Header>
        <Search>
            <SearchI/>
            <SearchInput placeholder="Search in chats"/>
        </Search>
        <SidebarButton>Start a new chat</SidebarButton>
        {/* List of Chats */}
    </Container>
  )
}   



export default Sidebar;

const Container = styled.div``;

const Search =  styled.div`
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

const UserAvatar =  styled(Avatar)`
cursor:pointer;
:hover{
    opacity:0.8;
}

`;

const IconsContainer =styled.div``;
