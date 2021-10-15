import React from 'react'
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import styled from 'styled-components'
import Icon from './Icon'

function AnimatedHeader() {        
    return (
        <HeaderWrap className="header">
            {/* links */}
            <div className="top-anim top-header-active">
            <Icon 
                    iconLink="https://twitter.com/charm_token"
                    iconImg="/images/icons/Twitter_01.svg" 
                />                       
                <Icon 
                    iconLink="https://instagram.com/charm_token"
                    iconImg="/images/icons/Instagram_01.svg" 
                />                
                <Icon 
                    iconLink="#"
                    iconImg="/images/icons/GitHub.svg" 
                />
                <Icon 
                    iconLink="https://discord.gg/m84xh3zW"
                    iconImg="/images/icons/Discord.svg" 
                />         
                <Icon 
                    iconLink="https://t.me/CharmTokenOfficial"
                    iconImg="/images/icons/Telegram_01.svg" 
                />  
            </div>
            
            {/* logo + navbar/menu */}
            <LogoNavWrap className="logo-nav-active">
                
                <LogoContainer className="logo-active">
                    <Logo src="/images/Charm_logo_redmask.png"></Logo>
                </LogoContainer>

                <NavContainer>
                    <ul className="nav-menu-active">
                        <LiWithSub className="with-sub main-li">
                            <Link to="/">Home</Link>
                            <SubMenu className="sub-menu">
                                <li><HashLink to="/#about">About</HashLink></li>
                                <li><HashLink to="/#sale">Sale</HashLink></li>
                                <li><HashLink to="/#features">Features</HashLink></li>
                                <li><HashLink to="/#tokenomics">Tokenomics</HashLink></li>
                                <li><HashLink to="/#road-map">Road Map</HashLink></li>
                                <li><HashLink to="/#team">Team</HashLink></li>
                            </SubMenu>                        
                        </LiWithSub>

                        <li className="main-li"><a href="/">Wpaper</a></li>
                        <li className="main-li">
                            {/* <a href="/">How to buy</a> */}
                            <Link to="/how-to-buy">How to buy</Link>
                        
                        </li>
                        <li className="main-li"><a href="/">Charm</a></li>
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

    .top-anim {
        transition: 0.3s ease-in-out;
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

    a {
        color: white;
        text-decoration: none;
        text-transform: uppercase;
    }
`

const LiWithSub = styled.li`
    position: relative;

    :hover {
        .sub-menu {
            display: flex;
            flex-direction: column;
        }
    }
`

// const HomeLink = styled.a`

//     color: white;
//     text-decoration: none;
//     text-transform: uppercase;
// `

const SubMenu = styled.ul`    
    display: none;
    position: absolute;
    top: 100%;
    left: -20px;
    background-color: black;
    padding: 0 20px 20px;
`