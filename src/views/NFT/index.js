import React from 'react'
import styled from 'styled-components'

function Index(props) {

    return ( props.trigger ? (
        <Container className="popup" >
            <PopupInner className="popup-inner">
                <CloseBtn className="close-btn" onClick={() => props.setTrigger(false)}>
                    close
                </CloseBtn>
                { props.children }
            </PopupInner>
        </Container>
    ) 
        : ''
    )
}

export default Index

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    color: black;

    display: flex;
    justify-content: center;
    align-items: center;
`

const PopupInner = styled.div`
    position: relative;
    padding: 32px;
    width: 100%;
    max-width: 90vw;
    background-color: #fff;
`

const CloseBtn = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
`