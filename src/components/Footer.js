import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'
import { smallBreakPoint } from '../css/variables'

function Footer() {
    return (
        <FooterWrapper>
            <nav>
                <Icon iconLink="https://twitter.com/charm_token" iconImg="/images/icons/Twitter_01.svg" />
                <Icon iconLink="https://instagram.com/charm_token" iconImg="/images/icons/Instagram_01.svg" />
                <Icon iconLink="https://discord.gg/m84xh3zW" iconImg="/images/icons/Discord.svg" />
                <Icon iconLink="https://t.me/CharmTokenOfficial" iconImg="/images/icons/Telegram_01.svg" />
            </nav>
            <address>
                <a 
                    href="mailto:info@charmtoken.net"
                    className="roboto"                
                >
                    Contact
                </a>
            </address>
        </FooterWrapper>
    )
}

export default Footer

const FooterWrapper = styled.footer`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-height: 60px;
    min-width: 100%;
    background-color: black;
    padding-right: 60px;

    nav {
        display: none;
    }

    a {
        font-style: normal;
        text-decoration: none;
    }

    a:link, a:visited {
        color: grey;
    }

    @media screen and (max-width: ${smallBreakPoint}) {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 20;

        justify-content: space-between;
        height: 50px;
        padding-right: 30px;

        nav {
            display: unset;
            padding-left: 15px;
        }
    }

`
