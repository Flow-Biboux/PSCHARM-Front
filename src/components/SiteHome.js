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
                    <FirstText>
                        Charm is a unique adult content
                        sharing platform powered by Solana
                        blockchain providing full anonymity
                        and true ownership to all our users.
                    </FirstText>
                    <SecondText>
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
                    Ga. Icid mi, te niendi blaborest que<br/>
                    quia veroris cienderum sit eum<br/>
                    atum restion pelit landita tectem<br/>
                    enes inihilicit aut quis eossum<br/>
                    liquide rferessequi blaut est dolupta<br/>
                    tecusantia denisci magnias sunturem<br/>
                    est, utas accae latquas ea nonsequos<br/>
                    exped quostoritio quodipsa aceperfero<br/>
                    quibusam eossit, con pores maximus<br/>
                    nonsed maximagnam ipidipi.
                    </FeaturesText>

                </FeaturesTextWrapper>

            </FeaturesWrapper>

            <Tokenomics />

            <Section 
                id="road-map"
                backgroundImg="Charm_03.jpg"
            />

            <Section id="team" />

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
        top: 126px;        
    }
`

const AboutUsTitle = styled.img`
    width: 450px;
    overflow: hidden;

    @media screen and (max-width: ${smallBreakPoint}) {
        width: 90%;
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

    #features:target {
        margin-top: 126px;
        color: red;
    }
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