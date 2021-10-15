import React from 'react'
import styled from 'styled-components'
import SaleSection from './SaleSection'
import { smallBreakPoint } from '../css/variables'

function Sale() {
    return (
        <Container id="sale">
            <SaleSection 
                title={"Presale"}
                price={"$0.0018"}
                textFirstLine={"1% of total supply available"}
                textSecondLine={"capped to 2 SOL per Wallet"}                
                barStatus={"0"}
                closed={true}        
            />
            <SaleSection 
                title={"Private Sale"}
                price={"$0.005"}
                textFirstLine={"5% of total supply available capped to"}
                textSecondLine={"20 SOL per wallet. To reduce volatility"}                
                barStatus={"47"}
            />
            <SaleSection 
                title={"Public Sale"}
                price={"$0.01"}
                textFirstLine={"10% of total supply available with"}
                textSecondLine={"no cap per wallet"}                
                barStatus={"75"}
            />
        </Container>
    )
}

export default Sale

const Container = styled.div`
    color: white;
    background-color: rgb(43, 0, 0);

    overflow: hidden;
    
    width: 100%;
    /* height: 100vh; EDIT LATER ?  remove */
    min-height: 40vh; /* EDIT LATER ? remove ? */

    margin-top: 30px;
    margin-bottom: 60px;

    display: flex;
    justify-content: space-evenly;

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
