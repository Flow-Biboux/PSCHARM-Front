import React from 'react'
import styled from 'styled-components'
import { smallBreakPoint, mediumBreakPoint, largeBreakPoint } from '../css/variables'

function SaleSection({ title, price, textFirstLine, textSecondLine, bar, barStatus, closed }) {
    return (
        <Container className={closed ? 'closed' : ''}>
            <Info>
                <Title>{title}</Title>

                <Price>{price}</Price>

                <Text className="roboto-light">
                    {textFirstLine}
                    <br />
                    {textSecondLine}
                </Text>
            </Info>

            <BarSettings className="barz">
                <BarProgress className="bar">
                    <Bar className="progress" style={{ width: barStatus + '%' }}></Bar>
                </BarProgress>
                <BarStatus className="roboto-light">{barStatus === 'soon' ? 'soon' : barStatus + '%'}</BarStatus>
            </BarSettings>
        </Container>
    )
}

export default SaleSection

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: space-between;
    justify-content: center;
    max-width: 32%;
    padding: 0 20px;
    width: 100%;

    @media screen and (max-width: ${largeBreakPoint}) {
        max-width: 45%;
    }

    @media screen and (max-width: ${mediumBreakPoint}) {
        max-width: 90%;
        margin-bottom: 30px;
    }
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    min-height: 320px;

    @media screen and (max-width: ${smallBreakPoint}) {
        min-height: auto;
    }
`

const Title = styled.h3`
    font-size: 52px;
    text-transform: uppercase;

    @media screen and (max-width: ${largeBreakPoint}) {
        font-size: 40px;
    }

    @media screen and (max-width: ${smallBreakPoint}) {
        font-size: 35px;
        margin-bottom: 20px;
    }
`

const Price = styled.span`
    font-size: 38px;

    @media screen and (max-width: ${smallBreakPoint}) {
        font-size: 28px;
        margin-bottom: 20px;
    }
`

const Text = styled.p`
    font-size: 24px;
    text-align: center;

    @media screen and (max-width: ${smallBreakPoint}) {
        font-size: 22px;
        margin-bottom: 20px;
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

const BarProgress = styled.div`
    background-color: transparent;
    height: 30px;
    width: 300px;
    border-radius: 20px;
    margin-bottom: 10px;
    background-color: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;

    .progress {
        height: calc(100% + 2px);
        border-radius: 20px;
        z-index: 20;
        background: rgb(67, 0, 0);
        position: relative;
        right: -1px;
        left: 0;
        background: linear-gradient(
            90deg,
            rgba(67, 0, 0, 1) 3%,
            rgba(87, 13, 1, 1) 29%,
            rgba(191, 96, 89, 1) 53%,
            rgba(87, 13, 1, 1) 72%,
            rgba(67, 0, 0, 1) 98%
        );
    }
`
const Bar = styled.div`
    height: calc(100% + 2px);
    border-radius: 20px;
    z-index: 20;
    background: rgb(67, 0, 0);
    position: relative;
    right: -1px;
    left: 0;
    background: linear-gradient(
        90deg,
        rgba(67, 0, 0, 1) 3%,
        rgba(87, 13, 1, 1) 29%,
        rgba(191, 96, 89, 1) 53%,
        rgba(87, 13, 1, 1) 72%,
        rgba(67, 0, 0, 1) 98%
    );
`
