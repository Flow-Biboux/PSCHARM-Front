import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { Button, WalletModal, WalletModalButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';


function Feed() {
    return (
        <Container id="album">
            <Link to="/">
                <ImgContainer src={"/images/bgLogo.jpg"}></ImgContainer>
            </Link>
            <AnchoContainer>
                {/* <Anchor href={"/"}>HOME</Anchor>
            <Anchor href={"/"}>WPAPER</Anchor>
            <Anchor href={"/"}>HOW TO BUY</Anchor> */}

                <Link to="/createMint">
                    <SubmitBtn>Create Mint</SubmitBtn>
                </Link>
            </AnchoContainer>
        </Container>
    )
}

export default Feed


const Container = styled.div`
    display: flex;
    background-color:#000;
    justify-content: center;
    position: relative;    
`
const ImgContainer = styled.img`
    display: grid;
    width:200px;
    
`
const AnchoContainer = styled.div`
    display: flex;
    align-items:center;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    
`
const Anchor = styled.a`
    display: grid;  
    color:#fff ;
    text-decoration: none;
    padding: 4px 8px;
`

const SubmitBtn = styled.button`
    cursor: pointer;
    width: auto;
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    text-transform: uppercase;
    border-radius: 12px;
    padding: 0px 16px 4px;
    border: none;
    margin-left:8px;
`