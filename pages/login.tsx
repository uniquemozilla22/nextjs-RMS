import { Button } from '@mui/material'
import { signInWithPopup } from 'firebase/auth'
import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import { auth, provider } from '../firebase'

const Login = () => {

  const signIn = () =>{
    signInWithPopup(auth,provider).catch(alert)
  }
  return (
    <Container>
        <Head>
            <title>Login </title>
        </Head>
        <LoginContainer>
            <Logo src={"https://static.whatsapp.net/rsrc.php/yz/r/lOol7j-zq4u.svg"}/>
            <Button variant="outlined" onClick ={signIn}>Sign in with Google</Button>
        </LoginContainer>
    </Container>
  )
}

export default Login


const Container  = styled.div`
display:grid;
place-items:center;
height:100vh;
background-color:whitesmoke`

const LoginContainer = styled.div`
display: flex;
flex-direction:column;
padding:6rem;
align-items: center;
background-color: white;
border-radius:5px;
box-shadow: 0 0 4px #2b2b2b;;
`

const Logo = styled.img`
height:200px;
width:200px;
margin-bottom:50px;

`