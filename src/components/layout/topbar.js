import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

function Feed() {
    return (
        <Container id="album">
            <Link to="/feed">
                <ImgContainer src={"/images/bgLogo.jpg"}></ImgContainer>
            </Link>
            <AnchoContainer>
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
    justify-content: center;
    
    position: fixed;
    top: 0;
    width: 100%;

    background-color:#000;
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