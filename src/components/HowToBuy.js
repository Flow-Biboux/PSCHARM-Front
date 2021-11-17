import React from 'react'
import styled from 'styled-components'
import Footer from './Footer'
import { smallBreakPoint } from '../css/variables'

function HowToBuy() {
    return (
        <Container id="how-to-buy">

            <HowToBuyTitle>
                HOW TO BUY CHARM
            </HowToBuyTitle>
            
            <PageText>

                <PageContent>
                    
                    <PageTitle>
                        PHANTOM
                    </PageTitle>
                    <PageSubTitle className="roboto-light">
                        (Solana Blockchain)
                    </PageSubTitle>

                    <StepsContent>

                        <StepsText>
                            <NumberLight>1</NumberLight> 
                            <p className="roboto-light">
                                Create a wallet on PHANTOM. You will be given a Seed <br/>
                                Phrase when you set up your crypto wallet for the first time.<br/> 
                                Please write that down on a piece of paper rather than save it digitally. 
                            </p>
                        </StepsText>

                        <StepsText>
                            <NumberLight>2</NumberLight> 
                            <p className="roboto-light">
                                Buy Solana on Binance/Coinbase/Huobi <br/> or any exchange who provide Solana
                            </p>
                        </StepsText>
                        <StepsText>
                            <NumberLight>3</NumberLight>
                            <p className="roboto-light">
                                Send SOLANA coin to your PHANTOM from the  <br/>
                                exchange you buy it<br/>
                                Go to your Phantom:<br/>
                                1 - click on "Deposit SOLANA"<br/>
                                2 - "send" from wallet/exchange"<br/>
                                3 - copy the address (start with 0x...)<br/>
                                Go to your exchange (Binance/Coinbase/Huobi) and click to "withdraw" your <br/>
                                Solana<br/>
                                Past your wallet address from Phantom (0x...)<br/>
                                Valid the operation, and wait to see your Solana on your Phantom<br/>
                                wallet.                
                            </p>
                        </StepsText>   
                        {/* <StepsText>
                            <NumberLight className="number-shadow">4</NumberLight>
                            <p className="roboto-light">
                                Visit SERUM or SOLAPE and swap your SOL for CHARM<br/>
                                - Connect your Phantom wallet<br/>
                                - Copy the CHARM address token and paste it on the search bar and swap <br/>
                                your Solana for CHARM                                
                            </p>
                        </StepsText>                         */}
                        <StepsText className="phantom-address">                 
                            <p className="roboto-ita">
                                Charm address token : 0x95757532284485...
                            </p>       
                        </StepsText>                        

                    </StepsContent>
                
                </PageContent>
                
                {/* <PageContent>

                    <PageTitle>
                        TRUSTWALLET/ METAMASK
                    </PageTitle>
                    <PageSubTitle>
                        (Binance blockchain)
                    </PageSubTitle>

                    <StepsContent>

                        <StepsText>
                            <NumberDark>1</NumberDark> 
                            <p>
                                CREATE A Trust wallet or Metamask wallet<br/>
                                Just download the Trust Wallet or MetaMask apps to begin. You will be given a Seed <br/>
                                Phrase when you set up your crypto wallet for the first time. Please write that down on a <br/>
                                piece of paper rather than save it digitally.
                            </p>
                        </StepsText>
                        <StepsText>
                            <NumberDark>2</NumberDark> 
                            <p>
                                Buy BNB (Smart Chain BNB) directly on Trust Wallet or you can buy it on Binance 
                                exchange.
                            </p>
                        </StepsText>
                        <StepsText>
                            <NumberDark className="number-shadow">3</NumberDark> 
                            <p>
                                Send BNB to your wallet address which can be found on the Trust Wallet app or <br/>
                                Metamask app.<br/>
                                1. Click on Smart chain (bnb coin)<br/>
                                2.Press the receive button <br/>
                                3.copy your BEP20 address; it should start with "0x".<br/>
                                Go to your Binance exchange and click to "withdraw" your BNB (Bep20)<br/>
                                Past your wallet address from trust wallet or Metamask (0x..)<br/>
                                Valid the operation, and wait to see your BNB on your trust wallet or metamask
                            </p>
                        </StepsText>
                        <StepsText>
                            <NumberDark className="number-shadow">4</NumberDark> 
                            <p>
                                Visit PancakeSwap and swap your Smart Chain BNB for <br/>
                                bCHARM.  (Binance Blockchain)<br/>
                                Go directly to PancakeSwap. After you've copied the address of bCHARM, <br/>
                                paste it into the search bar on PancakeSwap, selecting bCHARM from the <br/>
                                list and setting the slippage to 0.5%. If you get an error, increase the <br/>
                                slippage to 1%.<br/>
                                bCharm address token : 0x95757532284485...
                            </p>      
                        </StepsText>

                    </StepsContent>

                </PageContent> */}


            </PageText>

            <CongratulationText className="lead-title">
                <TitleImg src="/images/Charm_logo_redmask.png" />
                <HeadTitle>
                    CONGRATULATIONS, YOU ARE NOW
                    <br />
                    A PROUD HODLER OF CHARM!
                </HeadTitle>
            </CongratulationText>

            <Footer />
        </Container>
    )
}

export default HowToBuy

const Container = styled.div`
    padding-top: 126px;

    background-image: url('/images/Charm_01.jpg');    
    width: 100%;
    position: relative;
    height: 100vh;
    
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    color: white;

    display: flex;
    flex-direction: column;    
    align-items: center;

    @media screen and (max-width: ${smallBreakPoint}) {
        background-position: center;
        background-image: url('/images/Charm_01-mobile.jpg');
        padding-top: 90px;
        margin-bottom: 50px;

        min-height: 100vh;
        height: auto;
    }

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-color: #000;
        opacity: 0.3;
        z-index: 10;

        @media screen and (max-width: ${smallBreakPoint}) {
            opacity: 0.4;
        }
    }
`

const HowToBuyTitle = styled.h1`
    width: 100%;
    text-transform: uppercase;
    font-size: 100px;
    font-weight: normal;
    z-index: 10;
    margin-top: 10px;

    display: flex;
    justify-content: center;

    @media screen and (max-width: 768px) {
        font-size: 90px;
    }

    @media screen and (max-width: 690px) {
        font-size: 80px;
    }

    @media screen and (max-width: ${smallBreakPoint}) {
        font-size: 70px;
    }

    @media screen and (max-width: 500px) {
        font-size: 60px;
    }

    @media screen and (max-width: 430px) {
        font-size: 50px;
    }

    @media screen and (max-width: 360px) {
        font-size: 40px;
    }
`

const PageText = styled.div`
    display: flex;
    z-index: 10;
`

const PageContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PageTitle = styled.h2`
    font-weight: normal;
    font-size: 40px;
    display: flex;
    justify-content: center;

`

const PageSubTitle = styled.h3`
    font-size: 20px;
    margin-bottom: 20px;
`

const StepsContent = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 0 20px;

    list-style: none;
`

const StepsText = styled.li`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;

    &.phantom-address {
        margin-left: 54px;
    }

    p {
        width: 100%;        
        text-align: left;
        font-size: 20px;
    }
`

const NumberLight = styled.span`
    align-self: flex-start;

    color: rgb(67, 0, 0);
    font-size: 36px;
    padding: 0px 12px;
    margin-right: 12px;
    background-color: white;
    border-radius: 22%;

    &.number-shadow {
        box-shadow: 6px 6px 4px 1px rgba(0, 0, 0, 0.75);
    }
`

// const NumberDark = styled(NumberLight)`
//     color: white;
//     background-color: rgb(67, 0, 0);

// `

const TitleImg = styled.img`
    height: 200px;
    opacity: 20%;

    margin: 0 100px;
    /* padding: 30px; */

    @media screen and (max-width: ${smallBreakPoint}) {
        height: 135px;
    }
`

const HeadTitle = styled.p`
    text-align: center;
    font-size: 28px;
    font-weight: normal;
    line-height: 36px;
    position: absolute;

    top: 73px;


    @media screen and (max-width: ${smallBreakPoint}) {
        font-size: 20px;
        line-height: 25px;
        top: 50px;
    }
`

const CongratulationText = styled.div`
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;

    @media screen and (max-width: ${smallBreakPoint}) {
        display: none;
    }
`