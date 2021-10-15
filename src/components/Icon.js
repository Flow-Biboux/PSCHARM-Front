import React from 'react'
import styled from 'styled-components'

function Icon({iconLink, iconImg}) {
    return (
        <IconLink href={iconLink} target="_blank">
            <IconImg src={iconImg} />
        </IconLink>
    )
}

export default Icon

const IconLink = styled.a`
    cursor: pointer;
    height: 16px;
`

const IconImg = styled.img`
    height: 16px;
    width: 16px;
    margin-right: 12px;

    :hover {
        opacity: 0.5;
    }
`