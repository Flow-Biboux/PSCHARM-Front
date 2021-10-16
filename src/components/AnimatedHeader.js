import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components'
import Icon from './Icon'
import { smallBreakPoint, mediumBreakPoint, largeBreakPoint } from '../css/variables'

function AnimatedHeader() {    

    const [header, setHeader] = useState(false);

    const changeHeader = () => {
        if (window.scrollY > 0) {
            setHeader(true);
        } else {
            setHeader(false);
        }
    }

    const toggleMenu = () => {
        const menu = document.getElementById("nav-menu");

        menu.classList.contains('mobile-menu-active') ? menu.classList.remove("mobile-menu-active") : menu.classList.add("mobile-menu-active")
    }

    const scrollWithOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = 126; 
        window.scrollTo({ top: yCoordinate - yOffset, behavior: 'smooth' }); 
    }

    useEffect(() => {
        window.addEventListener('scroll', changeHeader);    
        return () => {
            window.removeEventListener('scroll', changeHeader);    
        }
    }, [])

    
    return (
        <HeaderWrap className="header">
            {/* links */}
            <TopHeader className={ header ? 'top-anim top-header-active' : 'top-anim top-header' }>
                <Icon 
                    iconLink="https://twitter.com/charm_token"
                    iconImg="/images/icons/Twitter_01.svg" 
                />                       
                <Icon 
                    iconLink="https://instagram.com/charm_token"
                    iconImg="/images/icons/Instagram_01.svg" 
                />
                <Icon 
                    iconLink="https://discord.gg/m84xh3zW"
                    iconImg="/images/icons/Discord.svg" 
                />         
                <Icon 
                    iconLink="https://t.me/CharmTokenOfficial"
                    iconImg="/images/icons/Telegram_01.svg" 
                />         
            </TopHeader>
            
            {/* logo + navbar/menu */}
            <LogoNavWrap className={ header ? 'logo-nav-active' : 'logo-nav' }>
                
                <LogoContainer className={ header ? 'logo-active' : 'logo' }>
                    <Logo src="/images/Charm_logo_redmask.png"></Logo>
                </LogoContainer>

                <NavContainer>
                    <MobileMenu id="hamburger" className="mobile-menu" onClick={toggleMenu}>
                        <Input type="checkbox" />

                        <SpanBurgerOne />
                        <SpanBurgerTwo />
                        <SpanBurgerThree />
                    </MobileMenu>
                    <ul id="nav-menu" className={ header ? 'nav-menu-active' : 'nav-menu' }>
                        <LiWithSub className="with-sub main-li">
                            <Link className="home" to="/"><Span>Home</Span></Link>
                            <SubMenu className="sub-menu">
                                <li><HashLink 
                                        smooth  
                                        to="/#about"
                                        scroll={el => scrollWithOffset(el)}
                                    >
                                        About
                                    </HashLink></li>
                                <li><HashLink 
                                        smooth 
                                        to="/#sale"
                                        scroll={el => scrollWithOffset(el)}
                                    >
                                        Sale
                                    </HashLink>
                                </li>
                                <li><HashLink smooth 
                                        to="/#features"
                                        scroll={el => scrollWithOffset(el)}
                                    >
                                        Features
                                    </HashLink>
                                </li>
                                <li><HashLink 
                                        smooth 
                                        to="/#tokenomics"
                                        scroll={el => scrollWithOffset(el)}
                                    >
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
                                {/* <li><HashLink smooth to="/#team">Team</HashLink></li> */}
                            </SubMenu>     

                        </LiWithSub>

                        <li className="main-li"><a href="#">Wpaper</a></li>
                        <li className="main-li">
                            <a href="#">How to buy</a>
                            {/* <Link to="/how-to-buy">How to buy</Link> */}
                        
                        </li>
                        <li className="main-li app-button">
                            <HashLink smooth target="_blank" to="/feed" className="charm-app">
                                Charm
                            </HashLink>
                        </li>
                    </ul>

                    <MobileNav>


                    </MobileNav>

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
    z-index: 9;

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
`

const LogoContainer = styled.div`
    position: absolute;    
    display: flex;
    justify-content: center;
    align-items: center;
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
            background: linear-gradient(90deg, rgba(107,3,3,1) 0%, rgba(193,54,3,1) 50%, rgba(107,3,3,1) 100%);
            color: white;
        }
    }

    a {
        color: white;
        text-decoration: none;
        text-transform: uppercase;
    }

    @media screen and (max-width: ${largeBreakPoint}) {
        
    }

    @media screen and (max-width: ${mediumBreakPoint}) {
        
    }

    @media screen and (max-width: ${smallBreakPoint}) {   
        padding: 0;
        
        .nav-menu-active {
            display: none;

            position: relative;
            /* display: flex;     */
            flex-direction: column;
            align-items: flex-end;
            
            top: 85px;
            width: 100%;
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

        .app-button {
            display: none;
        }

        .main-li {
            margin-bottom: 15px;      
        }
    }
`

const LiWithSub = styled.li`
    position: relative;

    :hover {
        .sub-menu {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }

    @media screen and (max-width: ${smallBreakPoint}) {
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

    &:checked ~ span {
        opacity: 1;
        transform: rotate(45deg) translate(-2px, -1px);
        background: white;
    }

    &:checked ~ span:nth-last-child(3) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
    }

    &:checked ~ span:nth-last-child(2) {
        transform: rotate(-45deg) translate(0, -1px);
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
    
    transform-origin: 4px 0px;
    
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                opacity 0.55s ease;
`

const SpanBurgerTwo = styled(SpanBurgerOne)`
    
`

const SpanBurgerThree = styled(SpanBurgerOne)`
    transform-origin: 0% 100%;
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

const MobileNav = styled.nav`

`