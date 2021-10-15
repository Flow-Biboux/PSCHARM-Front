import React, { useState } from 'react'
import styled from 'styled-components'
import AWS from "aws-sdk";
import NFT from '../NFT/index'



function FeedCard({wallet, NFTPicture, url}) {
    const [isBlur, setIsBlur] = useState(true)
    const [picture, setPicture] = useState(url)
    const [buttonPopup, setButtonPopup] = useState(false)
    
    const albumBucketName = 'charmtokensolana';
    const s3 = new AWS.S3({
        apiVersion: "2006-03-01", 
        params: { Bucket: albumBucketName } 
    });


    function buyNFT() {        
        console.log("coming soon");
        console.log(wallet);
    }

    async function likeNFT() {
        setIsBlur(!isBlur)

        s3.listObjects({
            Prefix: NFTPicture,
        },function (err, data) {
            if (err) {          
              return alert("There was an error viewing your object: " + err.message);
            }
            // console.log("data", data)       
            
            // 15 minutes
            const UrlExpireSeconds = 60 * 15 * 1;
    
            const photoUrl = s3.getSignedUrl('getObject', {
                Bucket: albumBucketName,
                Key: NFTPicture,
                Expires: UrlExpireSeconds
            });
                
            setPicture(photoUrl)            
        });


        // picture === url[0] ? setPicture(url[1]) : setPicture(url[0])
    }

    return (
        <Container className="feed-card">

            <Img 
                onClick={() => setButtonPopup(true)}
                className="feed-card-img"
                src={picture} 
                alt={"NFT pic of " + NFTPicture.slice(0, 4) + "..." + NFTPicture.slice(-8)}             
            />   
            <NFT trigger={buttonPopup} setTrigger={setButtonPopup} >                
                <ImgPopup 
                    src={picture} 
                    alt={"NFT pic of " + NFTPicture.slice(0, 4) + "..." + NFTPicture.slice(-8)} 
                />
                <ActionButton>
                    <button className="fa fa-heart" onClick={likeNFT}></button>
                    <button onClick={buyNFT}>Buy</button>
                </ActionButton>
            </NFT>

            <div className="text">
                {NFTPicture}
            </div>

        </Container>
    )
}

export default FeedCard

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    max-width: 25vw;

    margin: 0 auto 20px;
`
const Img = styled.img`
    /* height: 80px; */
    /* max-width: 30vw; */
`

const ActionButton = styled.div`
    display: flex;
    justify-content: center;
`
const ImgPopup = styled.img`
    max-height: 80vh;
    max-width: 80vw;
`