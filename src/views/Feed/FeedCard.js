import React, { useState } from 'react'
import styled from 'styled-components'
import AWS from "aws-sdk";
import NFT from '../NFT/index'
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider, web3, BN } from "@project-serum/anchor";
import { useWallet } from '@solana/wallet-adapter-react';
import idl from "../../idl.json";

const opts = {
    preflightCommitment: "processed"
}
const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl("devnet");

function FeedCard({NFTPicture, url}) {    
    const [picture, setPicture] = useState(url)
    const [buttonPopup, setButtonPopup] = useState(false)
    
    const albumBucketName = 'charmtokensolana';
    const s3 = new AWS.S3({
        apiVersion: "2006-03-01", 
        params: { Bucket: albumBucketName } 
    });

    const wallet = useWallet()

    async function getProvider() {
        /* create the provider and return it to the caller */
        /* network set to local network for now */

        const connection = new Connection(network, opts.preflightCommitment);

        const provider = new Provider(
            connection, wallet, opts.preflightCommitment,
        );
        return provider;
    }

    async function proxyTransfer() {
        let transfertSucess = false;

        const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
        const provider = await getProvider();
        const program = new Program(idl, programID, provider);

        const ttusdMint = new PublicKey("Gz2anxAVzZM3ZdZJgPhgWy38Wyw8G1UazMLwfj3TUuGR");

        const end = NFTPicture.lastIndexOf('/')
        const usrAccount = new PublicKey(NFTPicture.substring(0, end));
        const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
        console.log("2 :ttusdMint : " + ttusdMint);
        console.log("2 :TOKEN_PROGRAM_ID : " + TOKEN_PROGRAM_ID);

        console.log("programID : \n", programID.toBase58());

        const fromdAddress = await PublicKey.findProgramAddress(
            [
                provider.wallet.publicKey.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                ttusdMint.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        )
        console.log("fromdAddress :\n", fromdAddress)

        const toAddress = await PublicKey.findProgramAddress(
            [
                usrAccount.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                ttusdMint.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        )
        console.log("toAddress :\n", toAddress)

        try {
            await program.rpc.proxyTransfer(new BN(10000000), {
                accounts: {
                    authority: provider.wallet.publicKey,
                    from: fromdAddress[0],
                    to: toAddress[0],
                    tokenProgram: TOKEN_PROGRAM_ID,
                }
    
            });
            
            transfertSucess = true
        } catch(err) {
            console.log(err)
            transfertSucess = false
        }

        console.log("done transfer USD");

        return transfertSucess;

    }


    function buyNFT() {        
        console.log("coming soon");
        console.log(wallet);
    }

    async function likeNFT() {
        let transaction = false;

        try {
            if ( await proxyTransfer() == true){
                transaction = true;
            }
              
        } catch(err) {
            console.log(err)
        }

        if (transaction==true) {
            s3.listObjects({
                Prefix: NFTPicture,
            },function (err, data) {
                if (err) {          
                  return alert("There was an error viewing your object: " + err.message);
                }   
                
                // 15 minutes
                const UrlExpireSeconds = 60 * 15 * 1;
        
                const photoUrl = s3.getSignedUrl('getObject', {
                    Bucket: albumBucketName,
                    Key: NFTPicture,
                    Expires: UrlExpireSeconds
                });
                    
                setPicture(photoUrl)            
            });
        }
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