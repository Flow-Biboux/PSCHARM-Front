import React from 'react'
import styled from 'styled-components'

function HowToBuy({backgroundImg}) {
    return (
        <Container bgImage={backgroundImg}>
            <Title>
                HOW TO BUY CHARM
            </Title>
            
            <PageText>

                <PageContent>
                    
                    <PageTitle>
                        PHANTOM/ SOLLET
                    </PageTitle>
                    <PageSubTitle>
                        (Solana Blockchain)
                    </PageSubTitle>

                    <StepsContent>

                        <StepsText>
                            <NumberLight>1</NumberLight> 
                            <p>
                                Create a wallet on PHANTOM or SOLLET. You will be given a Seed <br/>
                                Phrase when you set up your crypto wallet for the first time.<br/> 
                                Please write that down on a piece of paper rather than save it digitally. 
                            </p>
                        </StepsText>

                        <StepsText>
                            <NumberLight>2</NumberLight> 
                            <p>
                                Buy Solana on Binance/Coinbase/Huobi <br/> or any exchange who provide Solana
                            </p>
                        </StepsText>
                        <StepsText>
                            <NumberLight>3</NumberLight>
                            <p>
                                Send SOLANA coin to your PHANTOM or SOLLET from the  <br/>
                                exchange you buy it<br/>
                                Go to your Phantom or Sollet:<br/>
                                1- click on "Deposit SOLANA"<br/>
                                2-"send" from wallet/exchange"<br/>
                                3- copy the address (start with 0x...)<br/>
                                Go to your exchange (Binance/Coinbase/Huobi) and click to "withdraw" your <br/>
                                Solana<br/>
                                Past your wallet address from Phantom or Sollet  (0x...)<br/>
                                Valid the operation, and wait to see your Solana on your Phantom or Sollet <br/>
                                wallet.                
                            </p>
                        </StepsText>   
                        <StepsText>
                            <NumberLight className="number-shadow">4</NumberLight>
                            <p>
                                Visit SERUM or SOLAPE and swap your SOL for CHARM<br/>
                                -Connect your Phantom or Sollet wallet<br/>
                                -Copy the CHARM address token and paste it on the search bar and swap <br/>
                                your Solana for CHARM<br/>
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

        </Container>
    )
}

export default HowToBuy

const Container = styled.div`
    padding-top: 126px;

    background-image: url("/images/Charm_01.jpeg");
    background-color: rgb(67, 0, 0);
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    color: white;

    display: flex;
    flex-direction: column;    
    align-items: center;
`

const Title = styled.h1`
    width: 100%;
    font-size: 100px;
    font-weight: normal;

    display: flex;
    justify-content: center;
`

const PageText = styled.div`
    display: flex;
`

const PageContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PageTitle = styled.h2`
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

    list-style: none;
`

const StepsText = styled.li`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;

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

const NumberDark = styled(NumberLight)`
    color: white;
    background-color: rgb(67, 0, 0);

`