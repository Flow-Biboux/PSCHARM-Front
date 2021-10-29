import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AWS from "aws-sdk";
import NFT from '../NFT/index'
import { FadeLoader } from 'react-spinners'
import { Connection, PublicKey, clusterApiUrl, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Program, Provider, web3, BN } from "@project-serum/anchor";
import { useWallet } from '@solana/wallet-adapter-react';
import idl from "../../idl.json";

const {
    createMint,
    createTokenAccount,
    mintToAccount,
} = require("../../utils");

const { SystemProgram, Keypair } = web3;

const opts = {
    preflightCommitment: "processed"
}
const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl("devnet");

function FeedCard({ NFTPicture, url }) {
    const [picture, setPicture] = useState(url)
    const [buttonPopup, setButtonPopup] = useState(false)
    const [loading, setLoading] = useState(false);

    const imgPopup = document.getElementById("popup-img")        

    // useEffect(() => {
    //     console.log(imgPopup)

    // }, [imgPopup]);

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
        console.log("usrAccount", usrAccount)
        console.log("NFTPicture.substring(0, end)", NFTPicture.substring(0, end))
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

        const amnt = 10 ** 6 * 10 ** (-1);
        try {
            await program.rpc.proxyTransfer(new BN(amnt), {
                accounts: {
                    authority: provider.wallet.publicKey,
                    from: fromdAddress[0],
                    to: toAddress[0],
                    tokenProgram: TOKEN_PROGRAM_ID,
                }

            });

            console.log("Like done, ", amnt / 10 ** 6, " transfer USD");
            transfertSucess = true
        } catch (err) {
            console.log(err)
            transfertSucess = false
            alert("Like rejected, try putting your heart or more tokens! \n Go to Mint page to airdrop yourself some TTUSD (Devnet only)")
            console.log("Like rejected, try putting your heart or more tokens! \n Go to Mint page to airdrop yourself some TTUSD (Devnet only)");
            setLoading(false)
        }

        return transfertSucess;

    }

    async function buyNFT() {
        console.log("coming soon");
        // alert("coming soon")

        const provider = await getProvider();
        console.log("provider", provider);
        const program = new Program(idl, programID, provider);

        const mint = await createMint(provider, provider.wallet.publicKey);
        const start = NFTPicture.lastIndexOf('/') + 1
        const end = NFTPicture.lastIndexOf('-')
        const metadataMint = new PublicKey(NFTPicture.substring(start, end))
        const mintAccount = await createTokenAccount(provider, metadataMint, provider.wallet.publicKey);  
        // const mintAccount = await createTokenAccount(provider, mint, provider.wallet.publicKey);  
        
        const metadataMainAccount = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
        const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");      

        const [charmPDA, _nonce0] = await web3.PublicKey.findProgramAddress(
            ["charmpda"],
            programID
        );
        
        const [newMetadataAccount, _nonce1] = await web3.PublicKey.findProgramAddress(
            ["metadata", metadataMainAccount.toBuffer(), mint.toBuffer()],
            metadataMainAccount
        );
        const [metadataAccount, _nonce2] = await web3.PublicKey.findProgramAddress(
            ["metadata", metadataMainAccount.toBuffer(), metadataMint.toBuffer()],
            metadataMainAccount
        );
        const [newMasterEditionAccount, _nonce3] = await web3.PublicKey.findProgramAddress(
            ["metadata", metadataMainAccount.toBuffer(), mint.toBuffer(), "edition"],
            metadataMainAccount
            );
        const [masterEditionAccount, _nonce4] = await web3.PublicKey.findProgramAddress(
            ["metadata", metadataMainAccount.toBuffer(), metadataMint.toBuffer(), "edition"],
            metadataMainAccount
            );
        const [masterEditionAccountTemp, _nonce5] = await web3.PublicKey.findProgramAddress(
            ["metadata", metadataMainAccount.toBuffer(), metadataMint.toBuffer(), "edition", "0"],
            metadataMainAccount
            );
       
        console.log("until here it's ok");
        console.log(charmPDA.toBase58());
        console.log(provider.wallet.publicKey.toBase58());
        console.log(metadataMainAccount.toBase58());
        console.log(newMetadataAccount.toBase58());
        console.log(newMasterEditionAccount.toBase58());
        console.log(masterEditionAccount.toBase58());
        console.log(mint.toBase58());
        console.log(mintAccount.toBase58());
        console.log(metadataAccount.toBase58());
        console.log(metadataMint.toBase58());
        console.log(SystemProgram.programId.toBase58());
        console.log(SYSVAR_RENT_PUBKEY.toBase58());
        console.log("masterEditionAccountTemp",masterEditionAccountTemp.toBase58());

        await program.rpc.changeOwnership({
            accounts: {
                signer: provider.wallet.publicKey,
                masterEditionAccount: mintAccount,
                pda: charmPDA,
                tokenProgram: TOKEN_PROGRAM_ID,
            }
        });

        await program.rpc.buy(new BN(3), _nonce0, {
            accounts: {
                payer: provider.wallet.publicKey,
                metadataProgram: metadataMainAccount,
                newMetadataAccount: newMetadataAccount,
                newEditionAccount: newMasterEditionAccount,
                masterEditionAccount: masterEditionAccount,
                newMintAccount: mint,
                newMintAuthority: provider.wallet.publicKey,
                tokenAccountOwner: charmPDA,
                tokenAccount: mintAccount,
                newMetadataUpdateAuthority: provider.wallet.publicKey,
                metadata: metadataAccount,
                metadataMint: metadataMint,
                systemProgram: SystemProgram.programId,                    
                rentProgram: SYSVAR_RENT_PUBKEY,                        
                editionPda: masterEditionAccountTemp,    
                tokenProgram: TOKEN_PROGRAM_ID,                    
            }
        });

        console.log("done");
    }

    async function likeNFT() {
        setLoading(true);
        console.log('welcome to likeNFT function!')
        let transaction = false;        
        

        try {
            if (await proxyTransfer() === true) {
                transaction = true;
            }

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
        
        if (transaction === true) {
            try {
                s3.listObjects({
                    Prefix: NFTPicture,
                }, function (err, data) {
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
                    console.log(picture)
                    setPicture(photoUrl)
                    console.log(picture)
                });   
                console.log(picture)
                // setLoading(false)             
            } catch(err) {
                console.log(err)
            }
            console.log(picture)
            // setLoading(false)
        }
        console.log(picture)

        // const imgPopup = document.getElementById("popup-img")        

        // if (imgPopup.src.includes("https://charmtokensolana.s3.amazonaws.com")) {
        // }
        setLoading(false)
        
    }

    function filterImgName(imgName) {
        imgName = decodeURIComponent(imgName)
        imgName = imgName.substring(imgName.indexOf('-') + 1, imgName.lastIndexOf('.'))

        // quick fix to delete when s3 uploads will be clean
        if (imgName.includes("png")) {
            imgName = decodeURIComponent(NFTPicture).substring(0, NFTPicture.lastIndexOf('.'))
        }

        return imgName
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

                <ImgSpinnerWrapper>
                    <ImgPopup
                        id="popup-img"
                        src={picture}
                        alt={"NFT pic of " + NFTPicture.slice(0, 4) + "..." + NFTPicture.slice(-8)}
                    />
                    { 
                        loading ? 
                            
                            <LoaderWrap>
                                <FadeLoader 
                                    color='maroon' 
                                    height={40} 
                                    width={8} 
                                    margin={30} 
                                    radius={50} 
                                    loading                                 
                                />
                            </LoaderWrap>
                        
                        : ''                
                    }                
                </ImgSpinnerWrapper>

                <ActionButton>
                    <Button
                        className="fa fa-heart" 
                        onClick={loading ? null : likeNFT}
                    ></Button>
                    <Button onClick={buyNFT}>Buy</Button>
                </ActionButton>
            </NFT>

            <div className="text">
                {filterImgName(NFTPicture)}
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
    cursor: pointer;
`

const ImgSpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoaderWrap = styled.div`
    position: absolute;
    /* top: calc(50% - 40px);
    left: calc(50% - 114px);     */
    display: flex;
    justify-content: center;
    align-items: center;

    > span {
        &:first-child {
            top: 22px;
            left: 38px;
        }
    }
`

const ActionButton = styled.div`
    display: flex;
    justify-content: center;
`

const Button = styled.button`
    cursor: pointer;
`

const ImgPopup = styled.img`
    max-height: 80vh;
    max-width: 80vw;
`