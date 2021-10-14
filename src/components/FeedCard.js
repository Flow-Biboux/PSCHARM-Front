import React, { useState } from 'react'
import styled from 'styled-components'

function FeedCard({NFTPicture}) {
    
    const [isBlur, setIsBlur] = useState(true)

    function viewBlurStatus() {
        console.log(isBlur);
    }

    function toggleBlur() {
        setIsBlur(!isBlur)
    }

    return (
        <Container>
            <Img alt="NFT pic of" src={NFTPicture} />
            {/* <Img src={NFTPicture} alt="NFT pic of" /> */}
            
            <div>
                {/* {NFTPicture} */}
            </div>

            <button onClick={toggleBlur}>Toggle Blur</button>
            <button onClick={viewBlurStatus}>View Blur State</button>


            <NFTInfo>
                <p>List of tags</p>
                <p>Sell button</p>
            </NFTInfo>

        </Container>
    )
}

export default FeedCard

const Container = styled.div`
    display: flex;
    flex-direction: column;

    width: 190px;
`
const Img = styled.img`
    height: 80px;
    width: 190px;
`
const NFTInfo = styled.div`
    display: flex;
    justify-content: space-between;
`
