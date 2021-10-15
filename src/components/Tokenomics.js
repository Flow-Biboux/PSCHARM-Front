import React from 'react'
import styled from 'styled-components'
import { smallBreakPoint, mediumBreakPoint, largeBreakPoint } from '../css/variables'

function Tokenomics() {
    return (
        <Container id="tokenomics">

            <TitleWrapper>
                <Title src="/images/tokenomics-title.png" />
            </TitleWrapper>

            <Text>
                All Transactions in the NFT Marketplace will be in USDT and be taxed at 15%.<br/>
                Meaning all the reflections will be distributed in USDT.
            </Text>

            <ImgWrapper>
                <RowWrap className="row">
                    <div className="lead-title">
                        <TitleImg src="/images/Charm_logo_redmask.png" />
                        <HeadTitle>
                            NFT<br/>
                            MARKET PLACE
                        </HeadTitle>
                    </div>
                </RowWrap>
                <RowWrap className="row">
                    <Button>
                        15% transaction fee
                    </Button>
                </RowWrap>
                <RowWrap className="row lower-part">
                    <div className="item first-img">
                        <Number>
                            50%
                        </Number>
                        <p className="title">
                            Charm holders
                        </p>
                        <IconImg src="/images/icons/CharmHolders.svg" />
                    </div>                            
                    <div className="item">
                        <Number>
                            25%
                        </Number>
                        <p className="title">
                            Development
                        </p>
                        <IconImg 
                            src="/images/icons/Development.svg" 
                            className="second-img"
                        />
                    </div>
                    <div className="item third-img">
                        <Number>
                            25%
                        </Number>
                        <p className="title">
                            Affiliator
                        </p>
                        <IconImg src="/images/icons/3men.svg" />
                    </div>
                </RowWrap>
            </ImgWrapper>

        </Container>
    )
}

export default Tokenomics

const Container = styled.div`
    color: white;
    background-color: rgb(43, 0, 0);

    overflow: hidden;
    
    width: 100%;
    /* height: 100vh; */ /* EDIT LATER ? */
    margin-bottom: 40px; /* EDIT LATER ? */
    min-height: 800px;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: ${smallBreakPoint}) {        
        min-height: 70vh;
    }
`

const TitleWrapper = styled.div`
    width: 800px;
    margin: 40px 0;

    @media screen and (max-width: ${largeBreakPoint}) {
        max-width: 800px;
        width: 100%;
    }

    @media screen and (max-width: ${mediumBreakPoint}) {
        width: 550px;
        width: 100%;
    }

    @media screen and (max-width: ${smallBreakPoint}) {
        width: 200px;
        width: 100%;
        margin: 20px 0;
    }
`

const Title = styled.img`
    width: 800px;

    @media screen and (max-width: ${largeBreakPoint}) {
        width: 550px;
        width: 100%;
    }

    @media screen and (max-width: ${mediumBreakPoint}) {
        width: 550px;
        width: 100%;
    }

    @media screen and (max-width: ${smallBreakPoint}) {
        width: 200px;
        width: 100%;
    }
`

const Text = styled.p`
    font-size: 22px;
    text-align: center;
    margin-bottom: 40px;
    
    @media screen and (max-width: ${mediumBreakPoint}) {
        font-size: 20px;
        /* margin-bottom: 20px; */
        width: 75%;
    }
    
    @media screen and (max-width: ${smallBreakPoint}) {
        font-size: 16px;
        margin-bottom: 20px;
        width: 75%;
    }
`
const ImgWrapper = styled.div`
    width: 100%;
`

const RowWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    .item {
        /* margin: 0 100px; */
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;        

        &:first-child {
            &::after {
                position: absolute;
                top: -2px;
                left: 151px;
                content: '';
                height: 45px;
                width: 2px;
                background-color: white;
                transform: rotate(45deg);

                @media screen and (max-width: ${smallBreakPoint}) {
                    top: -11px;
                    height: 36px;
                    left: 123px;
                }
            }
        }


        &:last-child {
            &::before {
                position: absolute;
                top: -2px;
                right: 151px;
                content: '';
                height: 45px;
                width: 2px;
                background-color: white;
                transform: rotate(-45deg);

                @media screen and (max-width: ${smallBreakPoint}) {
                    top: -11px;
                    height: 36px;
                    right: 123px;
                }
            }
        }

        &:nth-child(2) {
            margin-top: 100px;
            &::before {
                position: absolute;
                top: -40px;
                content: '';
                height: 40px;
                width: 2px;
                background-color: white;
                
                @media screen and (max-width: ${smallBreakPoint}) {
                    top: -42px;
                    height: 36px;
                }
            }
        }

    }

    &.lower-part {
        @media screen and (max-width: ${smallBreakPoint}) {
            display: flex;
            justify-content: space-evenly;
        }
    }

    .first-img {
        margin-right: 80px;

        @media screen and (max-width: ${smallBreakPoint}) {
            margin-right: 0;
        }
    }    

    .third-img {
        margin-left: 80px;
        width: 33%;
        max-width: 120px;

        @media screen and (max-width: ${smallBreakPoint}) {
            margin-left: 0;
            width: 33%;
            max-width: 104px;
        }
    }

    .lead-title {
        margin: 0 100px 50px 100px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;   

        &::after {
            position: absolute;
            top: 116px; 
            content: '';
            height: 40px;
            width: 2px;
            background-color: white;
        }
        @media screen and (max-width: ${smallBreakPoint}) {
            margin: 0 0 50px 0;

            &::after {
                height: 30px;
            }
        }
    }

    .title {
        font-size: 18px;
        margin-bottom: 20px;
        text-align: center;
        font-style: italic;
        opacity: 50%;

        @media screen and (max-width: ${smallBreakPoint}) {
            font-size: 16px;
        }
    }
`

const TitleImg = styled.img`
    height: 122px;
    opacity: 30%;
    
    margin: 0 100px;
    /* padding: 30px; */
    
    @media screen and (max-width: ${smallBreakPoint}) {       
        height: 114px;
    }
    
`

const HeadTitle = styled.p`
    text-align: center;
    font-size: 34px;
    line-height: 36px;    
    
    position: absolute;
    top: 22px;
    
    @media screen and (max-width: ${smallBreakPoint}) {       
        font-size: 32px;
        line-height: 33px;    

        top: 24px;
    }
`

const IconImg = styled.img`
    height: 104px;    

    &.second-img {
        height: 78px;
    }
    @media screen and (max-width: ${smallBreakPoint}) {
        height: 64px;

        &.second-img {
            height: 54px;
        }
    }
`

const Button = styled.p`
    padding: 10px 20px;
    background-color: white;
    color: rgb(43, 0, 0);

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

    font-size: 18px;
    font-weight: bold;

    @media screen and (max-width: ${smallBreakPoint}) {
        font-size: 16px;      
        padding: 5px 12px;         
    }
`

const Number = styled.span`
    font-size: 36px;
    
    @media screen and (max-width: ${smallBreakPoint}) {
        font-size: 33px;      
    }
`