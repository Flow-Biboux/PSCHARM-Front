import React from 'react'
import styled from 'styled-components'

function Section({ backgroundImg, h2}) {
    return (
        <Wrap bgImage={backgroundImg}>
            
        </Wrap>
    )
}

export default Section

const Wrap = styled.div`
    background-image: ${ props => `url("/images/${props.bgImage}")` };
    background-color: rgb(43, 0, 0);
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`