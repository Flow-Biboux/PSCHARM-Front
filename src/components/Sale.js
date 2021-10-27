import React from 'react'
import styled from 'styled-components'
import SaleSection from './SaleSection'
import { smallBreakPoint, mediumBreakPoint } from '../css/variables'

function Sale() {
    return (
        <Container id="sale">
            <SaleSection
                title={'Presale'}
                price={'$0.0018'}
                textFirstLine={'1% of total supply available'}
                textSecondLine={'capped to $500 per wallet'}
                barStatus={'100'}
                closed={true}
            />
            <SaleSection
                title={'Private'}
                price={'$0.005'}
                textFirstLine={'5% of total supply available'}
                textSecondLine={'capped to $7500 per wallet'}
                barStatus={'soon'}
                closed={false}
            />
            <SaleSection
                title={'Public'}
                price={'$0.01'}
                textFirstLine={'10% of total supply available'}
                textSecondLine={'with no cap per wallet'}
                barStatus={'soon'}
                closed={false}
            />
            <SaleSubText className="roboto-ita">
                Charm token value will be indexed on the current SOL market price 
                to reduce volatility
            </SaleSubText>
        </Container>
    )
}

export default Sale

const Container = styled.div`
    color: white;
    background-color: rgb(43, 0, 0);

    overflow: hidden;

    width: 100%;
    min-height: 80vh;

    margin-top: 30px;
    margin-bottom: 60px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    .closed {
        opacity: 50%;
    }

    @media screen and (max-width: ${smallBreakPoint}) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        height: inherit;

        margin: 20px 0;
    }
`
const SaleSubText = styled.p`
    font-size: 22px;
    margin-top: 20px;
    
    @media screen and (max-width: ${mediumBreakPoint}) {
        width: 70%;
    }
`