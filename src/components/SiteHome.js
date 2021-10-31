import React from 'react'
import styled from 'styled-components'
import Sale from './Sale'
import Tokenomics from './Tokenomics'
import Footer from './Footer'
import { HashLink } from 'react-router-hash-link'
import { scrollWithOffset, smallBreakPoint, mediumBreakPoint, largeBreakPoint } from '../css/variables'

function SiteHome() {

    return (
        <Container id="top">
            <AboutUsTitleWrapper>
                <TitleGradient>Charm</TitleGradient>
            </AboutUsTitleWrapper>
            <AboutUsWrapper id="about">
                <AboutUsTextWrapper>
                    <Title>About us</Title>
                    <FirstText className="roboto-light">
                        Charm is a unique adult content sharing platform powered by Solana blockchain providing full
                        anonymity and true ownership to all our users.
                    </FirstText>
                    <SecondText className="roboto-light">
                        We are aiming to change the perception of adult entertainment, conduct by elegance, modernity,
                        using one of the most secure ecosystem and innovative user experience.
                    </SecondText>
                </AboutUsTextWrapper>
                <HashLink smooth to="/#sale" scroll={(el) => scrollWithOffset(el)}>
                    <IconArrow src="/images/icons/arrow.svg"></IconArrow>
                </HashLink>
            </AboutUsWrapper>

            <Sale />

            <FeaturesWrapper id="features">
                <FeaturesImgWrapper>
                    <FeaturesFirstImg src="/images/Charm_screen01.png" />
                    <FeaturesSecondImg src="/images/Charm_screen02.png" />
                </FeaturesImgWrapper>

                <FeaturesTextWrapper>
                    <Title>Features</Title>

                    <FeaturesText className="roboto-light">
                        CHARM is a censorship-free platform
                        <br />
                        that provides a safe and true ownership
                        <br />
                        It enables anyone to create and <br />
                        upload some explicit media to be
                        <br />
                        viewed, liked and bought worldwide.
                        <br />
                        Explore your unconfessed fantasy
                        <br />
                        with like-minded people
                        <br />
                        and start crating your economic freedom, <br />
                        rather you're gentle or fierce!
                    </FeaturesText>
                </FeaturesTextWrapper>
            </FeaturesWrapper>

            <Tokenomics />

            <RoadMapWrapper id="road-map">
                <RoadMapTitle>Road Map</RoadMapTitle>

                <RoadMapContent>
                    <RoadMapQ3 className="col-roadmap">
                        <h3 className="col-roadmap-title">Q3</h3>
                        <span className="date">2021</span>
                        <ul>
                            <li className="roadmap-list-title done">
                                Conceptualization Charm Token Social Media Launch (Telegram, Discord, Instagram,
                                Twitter)
                            </li>
                            <li className="roadmap-list-title done">CHARM App V1 (Devnet)features:</li>
                            <li className="done">Mint your private picture NFT</li>
                            <li className="done">NFT feeds page</li>
                        </ul>
                    </RoadMapQ3>

                    <RoadMapQ4 className="col-roadmap">
                        <h3 className="col-roadmap-title">Q4</h3>
                        <ul>
                            <li className="roadmap-list-title done">
                                Website Launch V1 Hackathon Solana CHARM App V2 (Devnet)features:
                            </li>
                            <li className="done">NFT Bomb (like feature)</li>
                            <li>User and Creator subscription</li>
                            <li>Chat (private message)</li>
                            <li>Mint Audio/ Video NFT</li>
                            <li>Major Marketing Campaign (Event and Partnership)</li>
                            <li>Public sale: Launch Charm Token</li>
                        </ul>
                    </RoadMapQ4>

                    <RoadMapQ1 className="col-roadmap">
                        <h3 className="col-roadmap-title">Q1</h3>
                        <span className="date">2022</span>

                        <ul>
                            <li className="roadmap-list-title">CHARM App V3 (Closed Beta)features:</li>
                            <li>Live streaming</li>
                            <li>Decentralized Exchange listing Website</li>
                            <li>V2 updates</li>
                        </ul>
                    </RoadMapQ1>

                    <RoadMapQ2 className="col-roadmap">
                        <h3 className="col-roadmap-title">Q2</h3>
                        <ul>
                            <li className="roadmap-list-title">Centralized Exchange listing</li>
                            <li>Website V3 updates</li>
                            <li>CHARM App V4 (live)</li>
                        </ul>
                    </RoadMapQ2>
                </RoadMapContent>
                <HashLink className="bottom-arrow" smooth to="/#top" scroll={(el) => scrollWithOffset(el)}>
                    <IconArrowBottom src="/images/icons/arrow.svg"></IconArrowBottom>
                    <SpanArrow>Back to the top</SpanArrow>
                </HashLink>
            </RoadMapWrapper>
            <Footer />
        </Container>
    )
}

export default SiteHome

const TitleGradient = styled.h1`
    background: -webkit-linear-gradient(
        left,
        rgba(211, 87, 88, 1) 0%,
        rgba(105, 10, 15, 1) 27%,
        rgba(211, 87, 88, 1) 40%,
        rgba(84, 0, 7, 1) 56%,
        rgba(211, 87, 88, 1)
    );
    text-transform: uppercase;
    font-weight: normal;
    font-size: 100px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media screen and (max-width: ${smallBreakPoint}) {
        font-size: 70px;
    }
`

const Container = styled.div`
    padding-top: 136px;
    background-color: rgb(43, 0, 0);
    /* background-color: yellow; */
    overflow-x: hidden;

    @media screen and (max-width: ${smallBreakPoint}) {
        padding-top: 90px;
    }

    .bottom-arrow {
        align-self: center;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 15;
        
        width: 120px;
        text-decoration: none;
    }
`

const IconArrow = styled.img`
    max-width: 50px;
    opacity: 0.5;
    position: relative;
    animation: animChevron ease-in-out infinite 2s;

    @keyframes animChevron {
        0% {
            top: 0;
        }

        50% {
            top: 10px;
        }

        100% {
            top: 0;
        }
    }
`

const IconArrowBottom = styled(IconArrow)`
    transform: rotate(180deg);
`
const SpanArrow = styled.span`
    color: #fff;
    text-decoration: none;
    opacity: 0.5;
`

const AboutUsWrapper = styled.div`
    background-image: url('/images/home.jpg');
    background-color: rgb(43, 0, 0);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 100%;
    height: 100vh;
    min-height: 640px;

    color: white;

    @media screen and (max-width: ${smallBreakPoint}) {
        background-position: center;
        background-image: url('/images/home-mobile.jpg');
    }
`

const AboutUsTitleWrapper = styled.div`
    position: absolute;
    top: 130px;

    /* width: 800px; */
    width: 100%;

    display: flex;
    justify-content: center;

    @media screen and (max-width: ${smallBreakPoint}) {
        /* top: 126px;         */
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
        min-height: 360px;
        min-width: 360px;

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
    background-image: url('/images/Charm_02.jpg');
    overflow: hidden;
    flex-direction: row;

    justify-content: center;

    @media screen and (max-width: ${largeBreakPoint}) {
        flex-direction: column-reverse;
        height: auto;
    }

    @media screen and (max-width: ${smallBreakPoint}) {
        background-position: center;
        background-image: url('/images/Charm_02-mobile.jpg');
    }
`

const FeaturesImgWrapper = styled.div`
    margin-left: -330px;
    margin-right: -60px;
    display: flex;

    @media screen and (max-width: ${largeBreakPoint}) {
        margin-left: 0;
        margin-top: -50px;
        margin-bottom: 20px;
        justify-content: center;
    }
`

const FeaturesFirstImg = styled.img`
    height: 400px;
    align-self: flex-start;

    @media screen and (max-width: ${smallBreakPoint}) {
        max-width: 50%;
        height: auto;
    }
`

const FeaturesSecondImg = styled(FeaturesFirstImg)`
    z-index: 1;
    position: relative;
    margin-top: 85px;
    margin-left: -90px;

    @media screen and (max-width: ${smallBreakPoint}) {
        max-width: 50%;
        height: auto;
    }
`

const FeaturesTextWrapper = styled(AboutUsTextWrapper)`
    background-color: hsla(50, 33%, 25%, 0.25);
    background-color: rgba(255, 255, 255, 15%);
    min-height: 515px;
    min-width: 515px;

    @media screen and (max-width: ${smallBreakPoint}) {
        margin-top: 50px;
        height: 100%;
        max-height: 360px;
        width: 100%;
        max-width: 360px;
        min-height: 360px;
        min-width: 360px;

        p {
            font-size: 16px;
        }
    }
`
const FeaturesText = styled.p`
    /* font-size: 22px; */
`

const RoadMapWrapper = styled.div`
    background-image: url('/images/Charm_03.jpg');
    background-color: rgb(43, 0, 0);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 20px;
    position: relative;
    min-height: 100vh !important;
    height: auto !important;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    width: 100%;
    height: 100vh;
    min-height: 640px;

    color: white;

    @media screen and (max-width: ${largeBreakPoint}) {
        background-position-x: -651px;
    }

    @media screen and (max-width: ${mediumBreakPoint}) {
        background-position-x: -881px;
    }

    @media screen and (max-width: ${smallBreakPoint}) {
        background-position: right;
        background-image: url('/images/Charm_03-mobile.jpg');
        margin-bottom: 50px;
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

const RoadMapTitle = styled.h2`
    text-transform: uppercase;
    font-weight: normal;
    font-size: 104px;
    margin-bottom: 50px;
    z-index: 10;

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
const RoadMapContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    max-width: 1660px;
    margin: 0 auto;
    z-index: 10;

    @media screen and (max-width: ${largeBreakPoint}) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: ${smallBreakPoint}) {
        grid-template-columns: 1fr;
    }

    ul {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        text-align: left;
        list-style: none;

        @media screen and (max-width: ${smallBreakPoint}) {
            padding-left: 100px;
        }

        li {
            margin-bottom: 20px;
            font-family: 'Roboto';
            font-weight: 300;
            font-size: 18px;
            display: flex;
            align-items: flex-start;            
            
            &::before {
                content: '';
                min-width: 3px;
                min-height: 3px;
                margin-top: 10px;
                width: 3px;
                height: 3px;
                background-color: #fff;
                border-radius: 50%;
                margin-right: 10px;
            }

            &.done {
                position: relative;
                margin-left: 12px;
            }
            
            &.done::before {
                content: '✔️' ;
                /* content:url(img/image.jpg) ; */
                min-width: unset;
                min-height: unset;
                margin-top: unset;
                width: unset;
                height: unset;
                background-color: unset;
                border-radius: unset;
                margin-right: unset;

                position: absolute;
                left: -25px;
                top: -2px;
            }
        }
    }
    .col-roadmap {
        max-width: 400px;
        width: 100%;
        display: flex;
        padding: 0 20px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        position: relative;

        @media screen and (max-width: ${smallBreakPoint}) {
            max-width: 100%;
            padding: 0;
        }

        &::before {
            content: '';
            width: 100%;
            height: 8px;
            position: absolute;
            right: -105px;
            top: 25px;
            z-index: 10;

            @media screen and (max-width: ${smallBreakPoint}) {
                width: 3px;
                height: 100%;
                right: auto;
                left: 45px;
            }
        }

        .date {
            position: absolute;
            width: 100%;
            right: -60px;
            font-family: 'Roboto';

            @media screen and (max-width: ${smallBreakPoint}) {
                top: 20px;
                right: auto;
                left: 110px;
                width: auto;
                text-align: left;
            }
        }
    }

    .col-roadmap-title {
        font-size: 40px;
        font-weight: bold;
        padding: 5px 20px;
        border-radius: 10px;
        margin-bottom: 40px;
        z-index: 20;

        @media screen and (max-width: ${smallBreakPoint}) {
            margin-bottom: 20px;
        }
    }
`
const RoadMapQ3 = styled.div`
    position: relative;

    &::before {
        background: rgb(255, 255, 255);
        background: linear-gradient(90deg, rgba(255, 255, 255, 1) 40%, rgba(179, 101, 92, 1) 98%);

        @media screen and (max-width: ${smallBreakPoint}) {
            background: linear-gradient(180deg, rgba(255, 255, 255, 1) 40%, rgba(179, 101, 92, 1) 98%);
        }
    }

    .col-roadmap-title {
        background-color: #fff;
        color: rgb(61, 8, 3);
    }
`
const RoadMapQ4 = styled.div`
    &::before {
        background: rgb(179, 101, 92);
        background: linear-gradient(90deg, rgba(179, 101, 92, 1) 0%, rgba(133, 56, 44, 1) 80%);

        @media screen and (max-width: ${largeBreakPoint}) {
            display: none;
        }

        @media screen and (max-width: ${smallBreakPoint}) {
            display: flex;
            background: linear-gradient(180deg, rgba(179, 101, 92, 1) 0%, rgba(133, 56, 44, 1) 80%);
        }
    }

    .col-roadmap-title {
        background-color: rgb(178, 101, 92);
        color: rgb(61, 8, 3);
    }
`
const RoadMapQ1 = styled.div`
    &::before {
        background: rgb(133, 56, 44);
        background: linear-gradient(90deg, rgba(133, 56, 44, 1) 0%, rgba(80, 20, 7, 1) 100%);

        @media screen and (max-width: ${smallBreakPoint}) {
            display: flex;
            background: linear-gradient(180deg, rgba(133, 56, 44, 1) 0%, rgba(80, 20, 7, 1) 100%);
        }
    }

    .col-roadmap-title {
        background-color: rgb(133, 56, 44);
        color: #fff;
    }
`
const RoadMapQ2 = styled.div`
    .col-roadmap-title {
        background-color: rgb(80, 20, 7);
        color: #fff;
    }

    &::before {
        display: none;
    }
`
