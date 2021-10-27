import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import styled from 'styled-components'
import Icon from './Icon'
import { scrollWithOffset, smallBreakPoint, mediumBreakPoint, largeBreakPoint } from '../css/variables'

function AnimatedHeader() {
    const [header, setHeader] = useState(false)

    const changeHeader = () => {
        if (window.scrollY > 0) {
            setHeader(true)
        } else {
            setHeader(false)
        }
    }

    const toggleMobileMenu = () => {
        const menu = document.getElementById('nav-menu')

        if (menu.classList.contains('mobile-menu-active')) {
            menu.classList.remove('mobile-menu-active')
        } else {
            menu.classList.add('mobile-menu-active')
            if (window.scrollY === 0) menu.classList.add('mobile-menu-active-top')
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeHeader)
        return () => {
            window.removeEventListener('scroll', changeHeader)
        }
    }, [])

    useEffect(() => {
        if (window.innerWidth <= 640) {
            window.onscroll = function () {
                const mobileMenu = document.getElementById('nav-menu')
                let inputBox = document.getElementsByClassName('burger-box')

                if (mobileMenu.classList.contains('mobile-menu-active')) {
                    inputBox[0].checked = false

                    mobileMenu.classList.remove('mobile-menu-active')
                } else {
                    if (inputBox[0].checked === true) inputBox[0].checked = false
                }
            }
        }
    }, [])

    return (
        <HeaderWrap className="header">
            {/* links */}
            <TopHeader className={header ? 'top-anim top-header-active' : 'top-anim top-header'}>
                <Icon iconLink="https://twitter.com/charm_token" iconImg="/images/icons/Twitter_01.svg" />
                <Icon iconLink="https://instagram.com/charm_token" iconImg="/images/icons/Instagram_01.svg" />
                <Icon iconLink="https://discord.gg/m84xh3zW" iconImg="/images/icons/Discord.svg" />
                <Icon iconLink="https://t.me/CharmTokenOfficial" iconImg="/images/icons/Telegram_01.svg" />
            </TopHeader>

            {/* logo + navbar/menu */}
            <LogoNavWrap className={header ? 'logo-nav-active' : 'logo-nav'}>
                <LogoContainer className={header ? 'logo-active' : 'logo'}>
                    <Logo src="/images/Charm_logo_redmask.png"></Logo>
                </LogoContainer>

                <NavContainer>
                    <MobileMenu id="hamburger" className="mobile-menu" onClick={toggleMobileMenu}>
                        {/* <MobileMenu id="hamburger" className="mobile-menu" > */}
                        <Input type="checkbox" className="burger-box" />

                        <SpanBurgerOne className="span-one" />
                        <SpanBurgerTwo className="span-two" />
                        <SpanBurgerThree className="span-tree" />
                    </MobileMenu>
                    <ul id="nav-menu" className={header ? 'nav-menu-active' : 'nav-menu'}>
                        <LiWithSub className="with-sub main-li">
                            <Link className="home" to="/">
                                <Span>Home</Span>
                            </Link>
                            <SubMenu className="sub-menu">
                                <li>
                                    <HashLink smooth to="/#about" scroll={(el) => scrollWithOffset(el)}>
                                        About
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink smooth to="/#sale" scroll={(el) => scrollWithOffset(el)}>
                                        Sale
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink smooth to="/#features" scroll={(el) => scrollWithOffset(el)}>
                                        Features
                                    </HashLink>
                                </li>
                                <li>
                                    <HashLink smooth to="/#tokenomics" scroll={(el) => scrollWithOffset(el)}>
                                        Tokenomics
                                    </HashLink>
                                </li>
                                <li><HashLink 
                                        smooth 
                                        to="/#road-map"
                                        scroll={el => scrollWithOffset(el)}
                                    >
                                        Road Map
                                    </HashLink>
                                </li>
                                {/* <li><HashLink 
                                        smooth 
                                        to="/#team"
                                        scroll={el => scrollWithOffset(el)}
                                    >
                                        Team
                                    </HashLink>
                                </li> */}
                            </SubMenu>
                        </LiWithSub>

                        <li className="main-li">
                            <a href="/documents/Charm_White_Paper_PDF.pdf">Wpaper</a>
                        </li>
                        {/* <li className="main-li">
                            <a href="/">How to buy</a>
                            <Link to="/how-to-buy">How to buy</Link>
                        </li> */}
                        <li className="main-li app-button">
                            <HashLink smooth target="_blank" to="/feed" className="charm-app">
                                Charm
                            </HashLink>
                        </li>
                    </ul>

                </NavContainer>
            </LogoNavWrap>
        </HeaderWrap>
    )
}

export default AnimatedHeader

const HeaderWrap = styled.header`
    background-color: rgb(43, 0, 0);
    color: white;
    height: 1rm;

    position: fixed;
    width: 100%;
    z-index: 999;

    .top-anim {
        transition: 0.3s ease-in-out;
    }
`

const TopHeader = styled.div`
    &.top-header {
        opacity: 0;
        margin-top: -36px;

        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 10px;

        transition: 0.2s ease-in-out;
    }

    &.top-header-active {
        opacity: 1;
        margin-top: 0;

        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 10px;
    }

    @media screen and (max-width: ${largeBreakPoint}) {
    }

    @media screen and (max-width: ${mediumBreakPoint}) {
    }

    @media screen and (max-width: ${smallBreakPoint}) {
        &.top-header-active {
            display: none;
        }
    }
`

const LogoNavWrap = styled.div`
    position: relative;
    background-color: black;

    display: flex;
    justify-content: center;
    align-items: stretch;

    width: 100%;
    transition: 0.3s ease-in-out;

    &.logo-nav {
        min-height: 136px;
    }

    &.logo-nav-active {
        min-height: 90px;
    }
`

const LogoContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;

    &.logo {
        height: 136px;
        transition: 0.3s ease-in-out;
    }

    &.logo-active {
        height: 90px;
        transition: 0.3s ease-in-out;
    }

    @media screen and (max-width: ${largeBreakPoint}) {
        &.logo-active {
            position: inherit;
            margin: 0 auto;
        }
    }

    @media screen and (max-width: ${mediumBreakPoint}) {
        &.logo-active {
            position: inherit;
            margin: 0 auto;
        }
    }

    @media screen and (max-width: ${smallBreakPoint}) {
        &.logo-active {
            position: absolute;
        }
    }
`

const Logo = styled.img`
    height: inherit;
`

const NavContainer = styled.div`
    color: white;

    display: flex;
    justify-content: flex-end;
    align-items: stretch;

    width: 100%;
    padding-right: 10px;

    .nav-menu {
        display: none;
    }

    .nav-menu-active {
        display: flex;
        justify-content: flex-end;
    }

    li {
        list-style: none;
    }

    .main-li {
        display: flex;
        flex-direction: column;
        justify-content: center;

        margin: 0 10px;
    }

    .charm-app {
        padding: 10px 20px;
        background-color: white;
        color: rgb(43, 0, 0);

        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;

        font-size: 26px;
        font-weight: bold;

        &:hover {
            background: linear-gradient(90deg, rgba(107, 3, 3, 1) 0%, rgba(193, 54, 3, 1) 50%, rgba(107, 3, 3, 1) 100%);
            color: white;
        }
    }

    a {
        color: white;
        text-decoration: none;
        text-transform: uppercase;
        transition: 0.1s ease-in;

        &:hover {
            color: rgb(191, 96, 89);
        }
    }

    @media screen and (max-width: ${largeBreakPoint}) {
        width: unset;
        max-width: 66vw;

        .nav-menu-active {
            max-width: 66vw;
        }
    }

    @media screen and (max-width: ${mediumBreakPoint}) {
        width: unset;
        max-width: 67vw;

        .nav-menu-active {
            max-width: 66vw;
        }
    }

    @media screen and (max-width: ${smallBreakPoint}) {
        padding: 0;
        max-width: unset;
        width: 100%;

        .nav-menu-active {
            display: none;

            position: relative;
            /* display: flex;     */
            flex-direction: column;
            align-items: flex-end;

            top: 85px;

            width: 100%;
            max-width: unset;
            background-color: black;
        }

        .mobile-menu-active {
            display: block;

            position: relative;
            /* display: flex;     */
            flex-direction: column;
            align-items: flex-end;

            top: 85px;

            width: 100%;
            background-color: black;
        }

        .mobile-menu-active-top {
            top: 125px;
        }

        .app-button {
            display: none;
        }

        .main-li {
            margin-bottom: 15px;
            align-items: flex-end;
        }
    }
`

const LiWithSub = styled.li`
    position: relative;

    :hover {
        a {
            color: rgb(191, 96, 89);
        }
        .sub-menu {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            a {
                color: #fff;

                &:hover {
                    color: rgb(191, 96, 89);
                }
            }
        }
    }

    @media screen and (max-width: ${smallBreakPoint}) {
        :hover {
            .sub-menu {
                align-items: flex-end;
            }
        }
    }
`

const Span = styled.span`
    @media screen and (max-width: ${smallBreakPoint}) {
        display: none;
    }
`

const MobileMenu = styled.div`
    display: none;

    @media screen and (max-width: ${smallBreakPoint}) {
        display: block;
        width: 40px;
        height: 32px;
        position: absolute;
        top: 38px;
        right: 4px;

        cursor: pointer;

        /* opacity: 0; hide this
        z-index: 2; and place it over the hamburger */

        -webkit-touch-callout: none;

        &span:first-child {
            transform-origin: 0% 0%;
        }
    }
`

const Input = styled.input`
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;

    cursor: pointer;

    opacity: 0; /* hide this */
    z-index: 2; /* and place it over the hamburger */

    -webkit-touch-callout: none;

    &:checked ~ .span-one {
        opacity: 1;
        transform: rotate(45deg) translate(-2px, -1px);
        background: white;
    }

    &:checked ~ .span-two {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
        background: white;
    }

    &:checked ~ .span-tree {
        opacity: 1;
        transform: rotate(-45deg) translate(0, -1px);
        background: white;
    }
`

const SpanBurgerOne = styled.span`
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;

    background: white;
    border-radius: 3px;

    z-index: 1;

    transform-origin: 0% 0%;
    transform-origin: 4px 0px;

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        opacity 0.55s ease;
`

const SpanBurgerTwo = styled.span`
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;

    background: #cdcdcd;
    border-radius: 3px;

    z-index: 1;

    transform-origin: 4px 0px;
    transform-origin: 0% 0%;

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        opacity 0.55s ease;
`

const SpanBurgerThree = styled.span`
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;

    background: #cdcdcd;
    border-radius: 3px;

    z-index: 1;

    transform-origin: 0% 100%;

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        opacity 0.55s ease;
`

const SubMenu = styled.ul`
    display: none;
    position: absolute;
    top: 100%;
    left: -20px;
    background-color: black;
    padding: 0 20px 20px;

    @media screen and (max-width: ${smallBreakPoint}) {
        position: unset;

        display: flex;
        flex-direction: column;
        align-items: flex-end;

        padding: 0;
    }
`
