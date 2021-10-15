import React from 'react'
import styled from 'styled-components'
import { smallBreakPoint } from '../css/variables'

function SaleSection({title, price, textFirstLine, textSecondLine, bar, barStatus, closed}) {
    return (
        <Container className={closed ? "closed"  : ""}>
            <Info>
                <Title>{title}</Title>
                
                <Price>{price}</Price>

                <Text>
                    {textFirstLine}<br/>
                    {textSecondLine}
                </Text>
            </Info>

            <BarSettings className="barz">
                
                <BarProgress id="determinate"  value={barStatus} max="100"></BarProgress>

                <BarStatus>     
                    {barStatus === "0" ? "sold" : barStatus + "%"}
                </BarStatus>                

            </BarSettings>
        </Container>
    )
}

export default SaleSection

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;        

    @media screen and (max-width: ${smallBreakPoint}) {        
        width: 90%;
        margin-bottom: 20px;
    }
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    min-height: 320px;
    
    @media screen and (max-width: ${smallBreakPoint}) {        
        min-height: 25vh;
    }
`

const Title = styled.h3`
    font-size: 52px;
    text-transform: uppercase;
    
    @media screen and (max-width: ${smallBreakPoint}) {                
        font-size: 42px;
    }
`

const Price = styled.span`
    font-size: 38px;

    @media screen and (max-width: ${smallBreakPoint}) {                
        font-size: 28px;
    }
`

const Text = styled.p`
    font-size: 24px;
    text-align: center;

    @media screen and (max-width: ${smallBreakPoint}) {                
        font-size: 22px;
    }
`

const BarSettings = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;    

    width: 100%;

    @media screen and (max-width: ${smallBreakPoint}) {        
        width: 100%;
    }
`

const BarStatus = styled.span`
    font-size: 32px;
    text-transform: uppercase;

    @media screen and (max-width: ${smallBreakPoint}) {        
        font-size: 28px;
    }
`

const BarProgress = styled.progress`
    /* progress[value] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;        
    } */
    /* background: pink; */
    ::-webkit-progress-value { background-color: black; }

    width: 100%;
    height: 45px;

    @media screen and (max-width: ${smallBreakPoint}) {        
        width: 100%;
        height: 40px;
    }
`