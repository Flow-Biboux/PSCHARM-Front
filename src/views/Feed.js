import React from 'react'
import { Scroll } from "../Scroll.js"
import styled from 'styled-components'

function Feed() {
    return (
        <Wrap>

            <button onClick={Scroll}>List Img</button>
            <Container id="album" />
            
        </Wrap>
    )
}

export default Feed

const Wrap = styled.div`

`

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;

    color: white;

    .feed-card { 
        display: flex;
        flex-direction: column;
        width: 190px;
    }

    .feed-card-img { 
        height: 80px;
        width: 190px;
    }

    .text {
        overflow: hidden;
    }
`