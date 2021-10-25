import "../../App.css";
import React, { useState, useEffect, Component } from "react";
import idl from "../../idl.json";
import styled from 'styled-components'

import { Connection, PublicKey, clusterApiUrl, SYSVAR_RENT_PUBKEY, decodeUnchecked } from "@solana/web3.js";
import { Program, Provider, web3, BN } from "@project-serum/anchor";
import { useWallet, } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import FormSub from "./formSub";
import { blurAddPhoto, addPhoto, getLink, viewAlbum } from "../../s3";
import { pushArweave } from "../../pushArweave";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../../store/actions/index";
import Arweave from "arweave";
import { Buffer } from "buffer";
import { serialize, deserialize, deserializeUnchecked } from "borsh";
import { getMetadataAccount, decodeMetadata, MetadataKey, METADATA_SCHEMA, METADATA_SCHEMA2, Metadata, Data } from "../../metadata"
import { decode } from "@project-serum/anchor/dist/cjs/utils/bytes/bs58";

const {
    createMint,
    createTokenAccount,
    mintToAccount,
} = require("../../utils");

const { SystemProgram, Keypair } = web3;
const baseAccount = Keypair.generate();
const opts = {
    preflightCommitment: "processed"
}
const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl("devnet");


function Home() {
    const [myVar, setMyvar] = useState(null);
    const [myJson, setMyJson] = useState(null);
    const [myImg, setMyImg] = useState(null);
    const wallet = useWallet();

    const arweave = Arweave.init({});

    const toggleSelectWallet = () => {
        const selectWallet = document.querySelector("#select-wallet");

        selectWallet.classList.contains("select-wallet-active") ? selectWallet.classList.remove("select-wallet-active") : selectWallet.classList.add("select-wallet-active")
    }

    async function getProvider() {
        /* create the provider and return it to the caller */
        /* network set to local network for now */

        const connection = new Connection(network, opts.preflightCommitment);

        const provider = new Provider(
            connection, wallet, opts.preflightCommitment,
        );
        return provider;
    }

    // async function initialize() {
    //     const provider = await getProvider();
    //     /* create the program interface combining the idl, program ID, and provider */
    //     const program = new Program(idl, programID, provider);
    //     try {
    //         /* interact with the program via rpc */
    //         await program.rpc.initialize("----", {
    //             accounts: {
    //                 baseAccount: baseAccount.publicKey,
    //                 user: provider.wallet.publicKey,
    //                 systemProgram: SystemProgram.programId,
    //             },
    //             signers: [baseAccount]
    //         });

    //         const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    //         // console.log("account: ", account);
    //         console.log("initialize done");
    //     } catch (err) {
    //         console.log("Transaction error: ", err);
    //     }
    // }

    async function mintUSDT() {

        const provider = await getProvider();
        const program = new Program(idl, programID, provider);
        const uSDmint = await createMint(provider, provider.wallet.publicKey);
        const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
        const uSDmintAccount = await createTokenAccount(provider, uSDmint, provider.wallet.publicKey);
        console.log("2 :mintAccount : " + uSDmintAccount);


        const [charmpda, _nonce1] = await web3.PublicKey.findProgramAddress(
            ["charmpda"],
            programID
        );
        console.log("charmpda : \n", charmpda);

        await program.rpc.setAuthority({
            accounts: {
                signer: provider.wallet.publicKey,
                mint: uSDmint,
                pda: charmpda,
                tokenProgram: TOKEN_PROGRAM_ID,
            }
        });

        console.log("done pda mint");

    }

    async function faucet() {
        const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");

        const provider = await getProvider();
        const program = new Program(idl, programID, provider);

        const ttusdMint = new PublicKey("Gz2anxAVzZM3ZdZJgPhgWy38Wyw8G1UazMLwfj3TUuGR");
        const usrAccount = new PublicKey("J4X2zHqE4BHHRETreaLmrP7eDtyZtLrjfCBqHdtkXeBY");
        const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
        console.log("2 :ttusdMint : " + ttusdMint);
        console.log("2 :TOKEN_PROGRAM_ID : " + TOKEN_PROGRAM_ID);

        const [charmpda, nonce1] = await web3.PublicKey.findProgramAddress(
            ["charmpda"],
            programID
        );
        console.log("charmpda : \n", charmpda.toBase58());
        console.log("programID : \n", programID.toBase58());
        console.log(nonce1);

        const toAddress = await PublicKey.findProgramAddress(
            [
                provider.wallet.publicKey.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                ttusdMint.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        )

        console.log("todAddress :\n", toAddress[0].toBase58())
        // // getTokenAccountsByOwner()
        // const connectedpubkey = provider.wallet.publicKey.toBase58()
        // console.log('connectedpubkey : \n' ,connectedpubkey);
        const dataas = await provider.connection.getBalance(toAddress[0]);
        console.log('dataas :\n', dataas);


        // }catch(err) {
        // to
        // }
        if (dataas == 0) {

            await program.rpc.createAssociatedAccount({
                accounts: {
                    signer: provider.wallet.publicKey,
                    mint: ttusdMint,
                    userAccount: toAddress[0],
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                    rentProgram: SYSVAR_RENT_PUBKEY,
                    associatedProgram: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
                }
            });

        } else {
            await program.rpc.faucet(nonce1, {
                accounts: {
                    signer: provider.wallet.publicKey,
                    mint: ttusdMint,
                    userAccount: toAddress[0],
                    pda: charmpda,
                    tokenProgram: TOKEN_PROGRAM_ID
                }
            });

            console.log("done mint USD");


        }
    }
    async function proxyTransfer() {

        const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
        const provider = await getProvider();
        const program = new Program(idl, programID, provider);

        const ttusdMint = new PublicKey("Gz2anxAVzZM3ZdZJgPhgWy38Wyw8G1UazMLwfj3TUuGR");
        const usrAccount = new PublicKey("13opLWUkvRDPPqQ4hcYcSpMtZmCR9ApPVt7JJwCmhUPq");
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

        await program.rpc.proxyTransfer(new BN(10000000000), {
            accounts: {
                authority: provider.wallet.publicKey,
                from: fromdAddress[0],
                to: toAddress[0],
                tokenProgram: TOKEN_PROGRAM_ID,
            }

        });

        console.log("done transfer USD");

    }

    async function mintIt() {

        const provider = await getProvider();
        const program = new Program(idl, programID, provider);
        const mint = await createMint(provider, provider.wallet.publicKey);
        console.log("1: create Mint Account : \n", mint.toBase58());

        console.log(" myJson : \n", myJson);
        const arrayMyJson = JSON.parse(myJson)
        arrayMyJson.seller_fee_basis_points = 10;

        // uploading blurred image and clear image
        await blurAddPhoto(mint.toBase58(), provider.wallet.publicKey.toBase58(), arrayMyJson.name);
        await addPhoto(mint.toBase58(), provider.wallet.publicKey.toBase58(), arrayMyJson.name);

        arrayMyJson.image = "https://images.stakefort.com/" + provider.wallet.publicKey.toBase58() + "/" + mint.toBase58() + '-' + encodeURIComponent(arrayMyJson.name) + ".png";
        // arrayMyJson.animation_url = arrayMyJson.image;
        // arrayMyJson.external_url =arrayMyJson.image;
        console.log("arrayMyJson.image :", arrayMyJson.image);
        // arrayMyJson.attributes = [{ "trait_type": "Genre", "value": "Youth" }];

        // arrayMyJson.collection = {
        //     "name": "CHARM Collection",
        //     "family": "CHARM family"
        // };

        arrayMyJson.properties = {
            "files":
                [{
                    "uri": arrayMyJson.image,
                    "type": "image/png",
                    "cdn": true,
                }],
            "category": "image",
            "creators":
                [{
                    "address": provider.wallet.publicKey.toBase58(),
                    "share": 100
                }]
        }
        // console.log(" metadataToAr : \n", arrayMyJson);

        const tempWeave = await pushArweave(arrayMyJson);

        const linkAr = tempWeave;
        console.log("Arweave link : \n", linkAr);

        const metadataToMint = myVar + linkAr;
        console.log("metadata To Mint in MetadataAccount: \n", metadataToMint);

        const mintAccount = await createTokenAccount(provider, mint, provider.wallet.publicKey);
        console.log("mintAccount : \n" + mintAccount);

        mintToAccount(provider, mint, mintAccount, 1, provider.wallet.publicKey);
        // console.log("4: Minted to mintAccount");



        const metadataMainAccount = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
        const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
        const [metadataAccount, _nonce1] = await web3.PublicKey.findProgramAddress(
            ["metadata", metadataMainAccount.toBuffer(), mint.toBuffer()],
            metadataMainAccount
        );
        const [masterEditionAccount, _nonce2] = await web3.PublicKey.findProgramAddress(
            ["metadata", metadataMainAccount.toBuffer(), mint.toBuffer(), "edition"],
            metadataMainAccount);
        console.log("masterEditionAccount :\n ", masterEditionAccount.toBase58());
        // console.log("Metadatas to add to mint Account : \n", metadataToMint);
        console.log("metadataMainAccount : \n", metadataMainAccount.toBase58());
        console.log("mint Public Key : \n", mint.toBase58());
        // console.log("provider.publicKey : \n", provider.wallet.publicKey.toBase58());

        await program.rpc.metadata(metadataToMint, {
            accounts: {
                payer: provider.wallet.publicKey,
                mint: mint,
                mintAuthority: provider.wallet.publicKey,
                updateAuthority: provider.wallet.publicKey,
                metadataAccount: metadataAccount,
                masterEditionAccount: masterEditionAccount,
                metadataProgram: metadataMainAccount,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rentProgram: SYSVAR_RENT_PUBKEY,
            }
        });

        await program.rpc.edition({
            accounts: {
                payer: provider.wallet.publicKey,
                mint: mint,
                mintAuthority: provider.wallet.publicKey,
                updateAuthority: provider.wallet.publicKey,
                metadataAccount: metadataAccount,
                masterEditionAccount: masterEditionAccount,
                metadataProgram: metadataMainAccount,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
                rentProgram: SYSVAR_RENT_PUBKEY,
            }
        });
        await program.rpc.puffMetadata({
            accounts: {
                signer: provider.wallet.publicKey,
                metadataAccount: metadataAccount,
                mint: mint,
                metadataProgram: metadataMainAccount,
            }
        });
        // get metadata account that holds the metadata information
        const m = await getMetadataAccount(mint) //new PublicKey("EMu2TFePyLxMc3ppd1Ea7xRzTSmxXzBMAkHoQYFJKLNv"));
        console.log("metadata acc: ", m);

        // get the account info for that account
        const accInfomasterEditionAccount = await provider.connection.getAccountInfo(masterEditionAccount);
        console.log("accInfomasterEditionAccount : \n", accInfomasterEditionAccount);
        console.log("accInfomasterEditionAccountdeco : \n", decodeMetadata(accInfomasterEditionAccount.data));
        // console.log("accInfomasterEditionAccount.data : \n", accInfomasterEditionAccount.data);
        const accInfomasterEditionAccount2 = await provider.connection.getAccountInfo(mint);
        // 
        // 
        // console.log("accInfomasterEditionAccount : \n",deserialize(METADATA_SCHEMA,accInfomasterEditionAccount.data));
        
        // console.log("accInfomasterEditionAccount2 : \n", accInfomasterEditionAccount2);
        // console.log("accInfomasterEditionAccount2.data : \n", decodeMetadata(accInfomasterEditionAccount2.data));

        // console.log("accInfomasterEditionAccountdeser : \n", deserialize(METADATA_SCHEMA,Metadata,accInfomasterEditionAccount.data));


        // finally, decode metadata
        // console.log("decoded : \n", decodeMetadata(accInfo.data).data);

        const linkExploNFT = "https://explorer.solana.com/address/" + mint.toBase58() + "?cluster=devnet";
        console.log('link to MasterEdition account : \n', linkExploNFT);
        alert("congratulation, your NFT have been created under the name : \n" + mintAccount.toBase58() + ' !');
        window.open(linkExploNFT);
    }

    const submitForm = (data,e) => {

        let nName = "";
        if (data.name.length < 20) {
            nName = data.name.padEnd(20, "-")
        } else if (data.name.length > 20) {
            nName = data.name.slice(0, 20)
        };

        let nSymb = "";
        if (data.symbol.length < 4) {
            nSymb = data.symbol.padEnd(4, "-")
        } else {
            nSymb = data.symbol.slice(0, 4)
        };

        const NNN = nName + nSymb;

        setMyvar(NNN);

        // console.log("data :\n", data);
        const shortData = { ...data };
        delete shortData.photoupload;
        // console.log("shortData :\n", shortData);

        const jsondata = JSON.stringify(shortData);
        setMyJson(jsondata);

        console.log("Stringified Json : \n", jsondata);
        console.log("Stringed Name + Symbol :\n", NNN);

        console.log("File loaded :\n", data.photoupload[0].name);

        setMyImg(data.photoupload[0]);  
            // setTimeout( ()=> console.log("myJson", myJson), 5000)
        console.log("MyVar onSubmit:", myVar);
        console.log("MyJson onSubmit:", myJson);
        console.log("img onSubmit:", myImg);
// console.log(e.target,'------------------------------------');
        // e.target.reset();
        // console.log('that tha',data);
        // while (myVar === "" && myJson === "" && myImg === "") {
        //     console.log("Oh non, c'est vide par ici!");
        // }
  
// debugger
        // mintIt()



    }


    // function createArkey() {
    //     {
    //         arweave.wallets.generate().then((key) => {
    //             console.log(key);



    //             arweave.wallets.jwkToAddress(key).then((address) => {
    //                 console.log(address);
    //                 //1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY
    //             });
    //         });
    //     }

    // }

    useEffect(() => {
        if (myJson) {
            console.log("launching mint it process");
            mintIt()
        }
    }, [myJson])


    if (!wallet.connected) {

        return (
            <div className="divwallet">
                <p>
                    By ticking "Yes" I certify I'm over 18 years old.
                </p>
                <CheckBoxWrapper>
                    <YesBox
                        id="yes"
                        type="checkbox"
                        onClick={toggleSelectWallet}
                    />
                    <label htmlFor="yes">Yes</label>

                </CheckBoxWrapper>

                <SelectWalletWrapper id="select-wallet" className="select-wallet">
                    <SelectWalletLegend>(click "Select wallet to connect to your wallet")</SelectWalletLegend>
                    <WalletMultiButton />
                </SelectWalletWrapper>
            </div>
        )
    } else {
        return (
            <div className="app-home">
                <div>
                    <div className="baseee">
                        <FormSub SubmitForm={submitForm} />
                        <Button onClick={faucet}> Airdrop yourself from TTUSD </Button>
                        <Nota> Nota: Mint will fail if auto-approve isn't activated </Nota>
                        <div id="album" />
                        <br />
                    </div>

                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        state: state
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Home);

const Button = styled.button`
    font-family: 'Playfair Display', serif;
    cursor: pointer;
    margin-left: 109px;
    font-size: 20px;
    border-radius: 12px;
    padding: 2px 16px 4px;
    border: 2px solid #832e2e;
`
const Nota = styled.p`
    margin-left: 90px;
`

const SelectWalletWrapper = styled.div`
    display: none;

    &.select-wallet-active {
        display: block;
    }
`
const SelectWalletLegend = styled.p`
    margin-bottom: 30px;
`
const CheckBoxWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`

const YesBox = styled.input`
    width: 20px;
    height: 20px;
    margin-right: 5px;
`