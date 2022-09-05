import { CircularProgress } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const LoadingComp = () => {
  return (
    <Container>
            <img alt={"logo"} src="https://static.whatsapp.net/rsrc.php/yz/r/lOol7j-zq4u.svg" height={200}/>
            <CircularProgress color="success"/>
    </Container>
  )
}


const Container  = styled.div`
    display:grid;
    place-items:center;
    height:100vh;
`

export default LoadingComp