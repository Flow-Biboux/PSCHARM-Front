import React from 'react'
import styled from 'styled-components'
import Sale from './Sale'
import Tokenomics from './Tokenomics'
import Section from './Section'
import { smallBreakPoint } from '../css/variables'

function SiteHome() {
    return (
        <Container>
            <AboutUsTitleWrapper>
                <AboutUsTitle src="/images/charm.png" />
            </AboutUsTitleWrapper>
            <AboutUsWrapper id="about">
                

                <AboutUsTextWrapper>
                    <Title>About us</Title>
                    <FirstText className="roboto-light">
                        Charm is a unique adult content
                        sharing platform powered by Solana
                        blockchain providing full anonymity
                        and true ownership to all our users.
                    </FirstText>
                    <SecondText className="roboto-light">
                        We are aiming to change the
                        perception of adult entertainment,
                        conduct by elegance, modernity, using
                        one of the most secure ecosystem and
                        innovative user experience.
                    </SecondText>

                </AboutUsTextWrapper>
                
            </AboutUsWrapper>
            
            {/* <Section /> */}
            
            <Sale />
            
            <FeaturesWrapper id="features">

                <FeaturesImgWrapper>

                    <FeaturesFirstImg src="/images/Charm_screen01.png" />
                    <FeaturesSecondImg src="/images/Charm_screen02.png" />

                </FeaturesImgWrapper>
                
                <FeaturesTextWrapper>
                    <Title>Features</Title>

                    <FeaturesText>
                    CHARM is a censorship-free platform<br/>
                    that provides a safe and true ownership<br/>
                    around erotism and sexuality.<br/>
                    It enables anyone to create and <br/>
                    upload some explicit media to be<br/>
                    viewed, liked and bought worldwide.<br/>
                    Explore your unconfessed fantasy<br/>
                    with like-minded people<br/>
                    and start crating your economic freedom, <br/>
                    rather you're gentle or fierce!
                    </FeaturesText>

                </FeaturesTextWrapper>

            </FeaturesWrapper>

            <Tokenomics />

            {/* <RoadMapWrapper id="road-map">
                <RoadMapTitle>Road Map</RoadMapTitle>

                <RoadMapContent>                  

                    <RoadMapQ3>
                        <h3>Q3</h3>
                        <p>
                            Conceptualization Charm Token
                            Social Media Launch (Telegram, Discord, Instagram, Twitter)
                            CHARM App V1 (Devnet)features:
                            •	Mint your private picture NFT 
                            •	Random scrolling, NFT feeds page
                        </p>
                    </RoadMapQ3>

                    <RoadMapQ4>
                        <h3>Q4</h3>

                        <p>
                            Website Launch V1 
                            Hackathon Solana
                            CHARM App V2 (Devnet)features:
                            •	user and creator subscription
                            •	NFT Bomb 
                            •	Chat (private message)
                            •	Mint Audio/ Video NFT
                            Major Marketing Campaign (Event and Partnership)
                            Public sale: Launch Charm Token

                        </p>

                    </RoadMapQ4>                   

                    <RoadMapQ1>
                        <h3>Q1</h3>

                        <p>
                            CHARM App V3 (Closed Beta)features:
                            •	live streaming 
                            Decentralized Exchange listing
                            Website V2 updates
                        </p>

                    </RoadMapQ1>

                    <RoadMapQ2>
                        <h3>Q2</h3>

                        <p>
                            Centralized Exchange listing
                            Website V3 updates
                            CHARM App V4 (live)
                        </p>

                    </RoadMapQ2>

                </RoadMapContent>

            </RoadMapWrapper> */}

        </Container>
    )
}

export default SiteHome

const Container = styled.div`
    padding-top: 136px;
    background-color: rgb(43,0,0);
    /* background-color: yellow; */

    @media screen and (max-width: ${smallBreakPoint}) {        
        padding-top: 90px;
    }
`

const AboutUsWrapper = styled.div`
    background-image: url("/images/home.PNG");
    background-color: rgb(43, 0, 0);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: 100vh;
    min-height: 640px;
    
    color: white;

    @media screen and (max-width: ${smallBreakPoint}) {                
        background-position-x: -484px;
        background-position-y: -8px;
    }
`

const AboutUsTitleWrapper = styled.div`
    position: absolute;
    top: 121px;
    
    /* width: 800px; */
    width: 100%;

    display: flex;
    justify-content: center;

    @media screen and (max-width: ${smallBreakPoint}) {
        /* top: 126px;         */
    }
`

const AboutUsTitle = styled.img`
    width: 450px;
    overflow: hidden;

    @media screen and (max-width: ${smallBreakPoint}) {
        width: 90%;
        max-width: 450px;
    }
`

const AboutUsTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 80px;
    height: 100%;
    max-height: 515px;
    width: 100%;
    max-width: 515px;

    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 100%;

    p {
        font-size: 22px;
    }

    @media screen and (max-width: ${smallBreakPoint}) {
        margin-top: 50px;
        height: 100%;
        max-height: 360px;
        width: 100%;
        max-width: 360px;

        p {
            font-size: 16px;
        }
    }
`
const Title = styled.h2`
    font-weight: normal;
    font-size: 40px;    
    margin-bottom: 20px;
    
    @media screen and (max-width: ${smallBreakPoint}) {
        font-size: 32px;    
        margin-bottom: 10px;
    }
`

const FirstText = styled.p`
    margin-bottom: 20px;
    text-align: center;
    width: 70%;

    @media screen and (max-width: ${smallBreakPoint}) {
        width: 80%;
    }
`

const SecondText = styled.p`
    text-align: center;

    width: 75%;

    @media screen and (max-width: ${smallBreakPoint}) {
        width: 83%;
        margin-bottom: 20px;
    }
`

const FeaturesWrapper = styled(AboutUsWrapper)`
    background-image: url("/images/Charm_02.jpg");
    overflow: hidden;

    justify-content: flex-start;
`

const FeaturesImgWrapper = styled.div`
    height: 500px;
    margin-left: 30px;
    
    display: flex;
`

const FeaturesFirstImg = styled.img`
    height: 400px;
    align-self: flex-start;
`

const FeaturesSecondImg = styled(FeaturesFirstImg)`
    z-index: 1;
    position: relative;
    top: 85px;
    right: 90px;
`

const FeaturesTextWrapper = styled(AboutUsTextWrapper)`
    background-color: hsla(50, 33%, 25%, .25);
    background-color: rgba(255, 255, 255, 15%);
`
const FeaturesText = styled.p`
    /* font-size: 22px; */
`

const RoadMapWrapper = styled.div`
    background-image: url("/images/Charm_03.jpg");
    background-color: rgb(43, 0, 0);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    
    width: 100%;
    height: 100vh;
    min-height: 640px;
    
    color: white;

    @media screen and (max-width: ${smallBreakPoint}) {                
        background-position-x: -484px;
        background-position-y: -8px;
    }
`

const RoadMapTitle = styled.h2`
    text-transform: uppercase;
    font-size: 104px;
`
const RoadMapContent = styled.div`
    display: flex;
`
const RoadMapQ3 = styled.div`
    max-width: 25vw;
`
const RoadMapQ4 = styled.div`
    max-width: 25vw;
`
const RoadMapQ1 = styled.div`
    max-width: 25vw;
`
const RoadMapQ2 = styled.div`
    max-width: 25vw;
`