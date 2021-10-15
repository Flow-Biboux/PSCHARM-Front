import React from 'react'
import { HashLink } from 'react-router-hash-link'
import styled from 'styled-components'

function NFTApp() {
    return (
        <Container>
            NFT App<br/>
            <HashLink smooth target="_blank" to="/">HOME</HashLink>
        </Container>
    )
}

export default NFTApp

const Container = styled.div`
    background-color: rgb(43, 0 ,0);
    height: 100vh;
    color: white;

    a {
        color: white;
        text-decoration: none;
    }
`