import "../../App.css";
import React, { useState, useEffect } from "react";
import idl from "../../idl.json";
import styled from "styled-components"

import { useForm } from "react-hook-form";
import { Connection, PublicKey, clusterApiUrl, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Program, Provider, web3, BN } from "@project-serum/anchor";
import { useWallet, } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import FormSub2 from "./formSub2";
import { addPhoto } from "../../s3";
import { pushArweave } from "../../pushArweave";


var bs58 = require('bs58')


const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
const {
    createMint,
    createTokenAccount,
    mintToAccount,
} = require("../../utils");

const { SystemProgram } = web3;
// const baseAccount = Keypair.generate();
const opts = {
    preflightCommitment: "confirmed"
}
const programID = new PublicKey(idl.metadata.address);
// const network = clusterApiUrl("mainnet-beta");
const network = clusterApiUrl("devnet");
const decimals = 9;

function BuyIt() {
    // const [myVar, setMyvar] = useState(null);
    const [myJson, setMyJson] = useState(null);
    const [myImg, setMyImg] = useState(null);
    const [nSol, setNSol] = useState(null);
    const [PSCHARM, setPSCHARM] = useState(null);
    const wallet = useWallet();
    const { register, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {},
        resolver: undefined,
        context: undefined,
        criteriaMode: "firstError",
        shouldFocusError: true,
        shouldUnregister: true,
    })
    useEffect(() => {
        if (myJson) {
            console.log("launching createPSCHARM process");
            createPSCHARM()
        }
    }, [myJson])

    useEffect(() => {
        if (nSol && nSol > 0) {
            console.log(`Buy sol (${nSol}) process launched`);
            asAcc(nSol)
        }
    }, [nSol])

    useEffect(() => {
        getPSCHARMPrice("https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT")        
    }, [])

    const toggleSelectWallet = () => {
        const selectWallet = document.querySelector("#select-wallet");

        selectWallet.classList.contains("select-wallet-active") ? selectWallet.classList.remove("select-wallet-active") : selectWallet.classList.add("select-wallet-active")
    }

    async function getPSCHARMPrice(url) {
        fetch(url)
            .then(res=> res.json())
            .then(data => {                
                setPSCHARM(data.price / 0.005)   
            })
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


    async function asAcc(nSol) {


        const provider = await getProvider();
        const program = new Program(idl, programID, provider);

        // to change
        const mint = new PublicKey("6wE85vn1hj4D53J1epxb9caKXtCCzoUmdG89qG3oPYSZ");

        const metadataMainAccount = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
        const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

        const [charmpda, nonce1] = await web3.PublicKey.findProgramAddress(
            ["charmpda"],
            programID
        );

        const [fromdAddress, _nonce3] = await web3.PublicKey.findProgramAddress(
            [
                provider.wallet.publicKey.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                mint.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        )
        const charmBag = new PublicKey('Ah2h9uwmryEit9uCY6upTkwAc4wjVcRBSzYdrvGDqpTy')
        // const charmBag = new PublicKey('13opLWUkvRDPPqQ4hcYcSpMtZmCR9ApPVt7JJwCmhUPq') //fake
        console.log("1stpart done", fromdAddress.toBase58());
        const dataas = await provider.connection.getBalance(fromdAddress);

        console.log("dataas :\n", dataas);
        console.log("charmpda :\n", charmpda.toBase58());

        if (dataas === 0) {

            await program.rpc.createAssociatedAccount(

                {
                    accounts: {
                        signer: provider.wallet.publicKey,
                        mint: mint,
                        userAccount: fromdAddress,
                        tokenProgram: TOKEN_PROGRAM_ID,
                        systemProgram: SystemProgram.programId,
                        rentProgram: SYSVAR_RENT_PUBKEY,
                        associatedProgram: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
                    }
                });
            console.log("associated account done");

            await program.rpc.buyCharm(nonce1, new BN(nSol * 10 ** decimals), {
                accounts: {
                    signer: provider.wallet.publicKey,
                    mint: mint,
                    userAccount: fromdAddress,
                    pda: charmpda,
                    charmAccount: charmBag,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId
                }
            });
            console.log("send ", nSol, " from \n", mint.toBase58(), 'to \n', fromdAddress.toBase58());

        } else {

            await program.rpc.buyCharm(nonce1, new BN(nSol * 10 ** decimals), {
                accounts: {
                    signer: provider.wallet.publicKey,
                    mint: mint,
                    userAccount: fromdAddress,
                    pda: charmpda,
                    charmAccount: charmBag,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId
                }
            });

            console.log("send ", nSol, "sent from \n", mint.toBase58(), 'to \n', fromdAddress.toBase58());
        }
    }

    async function createPSCHARM() {


        const provider = await getProvider();
        const program = new Program(idl, programID, provider);

        const mint = await createMint(provider, provider.wallet.publicKey);
        console.log("1: create Mint Account : \n", mint.toBase58());

        const arrayMyJson = {};
        arrayMyJson.name = "PreSale_Charm_Token"
        arrayMyJson.symbol = "PSCHARM"
        arrayMyJson.address = mint.toBase58()


        // uploading image and clear image TOCHANGEEEE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        await addPhoto(mint.toBase58(), provider.wallet.publicKey.toBase58(), arrayMyJson.name);
        const iii = "https://images.stakefort.com/" + "PSCHARM-token" + "/" + encodeURIComponent(arrayMyJson.name) + ".png"
        arrayMyJson.logoUri = iii

        console.log("arrayMyJson1 :", arrayMyJson);
        const arrayMyJsona = JSON.stringify(arrayMyJson)
        console.log("arrayMyJson1 stringged :", arrayMyJsona);

        const tempWeave = await pushArweave(arrayMyJson);
        const linkAr = tempWeave;
        console.log("Arweave link : \n", linkAr);

        const mintAccount = await createTokenAccount(provider, mint, provider.wallet.publicKey);
        console.log("mintAccount : \n" + mintAccount);

        mintToAccount(provider, mint, mintAccount, 10 ** (decimals + 9), provider.wallet.publicKey);

        const metadataMainAccount = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
        const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

        const [metadataAccount, _nonce1] = await web3.PublicKey.findProgramAddress(
            ["metadata", metadataMainAccount.toBuffer(), mint.toBuffer()],
            metadataMainAccount);

        const [masterEditionAccount, _nonce2] = await web3.PublicKey.findProgramAddress(
            ["metadata", metadataMainAccount.toBuffer(), mint.toBuffer(), "edition"],
            metadataMainAccount);

        const [charmpda, nonce1] = await web3.PublicKey.findProgramAddress(
            ["charmpda"],
            programID);

        console.log("masterEditionAccount :\n ", masterEditionAccount.toBase58());
        console.log("metadataMainAccount : \n", metadataMainAccount.toBase58());
        console.log("mint Public Key : \n", mint.toBase58());
        console.log("Charm PDA : \n", charmpda.toBase58());

        await program.rpc.initialize(
            arrayMyJson.name,
            arrayMyJson.symbol,
            linkAr,
            {
                accounts: {
                    payer: provider.wallet.publicKey,
                    mint: mint,
                    pda: charmpda,
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

        console.log("initialize done");

    }


    async function bs58ma() {
        const address = 'Ah2h9uwmryEit9uCY6upTkwAc4wjVcRBSzYdrvGDqpTy'
        const bs58Add = bs58.decode(address)

        console.log('bs58Add \n', bs58Add);

        // 
        // const ad=bs58.encode()

    };


    const submitForm = (data, e) => {

        const shortData = { ...data };
        delete shortData.photoupload;

        const jsondata = JSON.stringify(shortData);
        setMyJson(jsondata);

        console.log("Stringified Json : \n", jsondata);

        console.log("File loaded :\n", data.photoupload[0].name);

        setMyImg(data.photoupload[0]);

    }

    const buySub = (data, event) => {
        // TODO: proper validation against value below 0 - security against bypass
        if (data.nSol < 0)
            console.log("value below 0 are prohibited");

        setNSol(data.nSol)
        event.preventDefault();
    }
   
    if (!wallet.connected) {

        return (
            <div className="divwallet">
                <p>
                    By ticking "Yes" I certify I"m over 18 years old.
                </p>
                <CheckBoxWrapper>
                    <YesBox
                        id="yes"
                        type="checkbox"
                        onClick={toggleSelectWallet}
                    />
                    <LabelBox htmlFor="yes">Yes</LabelBox>
                </CheckBoxWrapper>

                <SelectWalletWrapper id="select-wallet" className="select-wallet">
                    <SelectWalletLegend>(click "Select wallet to connect to your wallet")</SelectWalletLegend>
                    <WalletMultiButton />
                </SelectWalletWrapper>
            </div>
        )
    } else {
        return (
            <FormWrapper>                
                    
                {/* <FormSub2 SubmitForm={submitForm} /> */}
                
                <form onSubmit={handleSubmit(buySub)}>                            
                    <FormLabel className="roboto-light">Number of SOL you want to pay</FormLabel>
                    <Input
                        type="number"
                        name="nSol"
                        placeholder="Ex: 2.50"
                        min="0"
                        max="37.5"
                        step="any"                        
                        {...register('nSol', { required: true })}
                    />
                    <Button className="roboto-light">Buy PSCHARM</Button>
                </form>                

                <Nota className="roboto-ita">Nota: 1 SOL = {PSCHARM} PSCHARM</Nota>

            </FormWrapper> 
        )
    }
}

export default BuyIt;

const FormWrapper = styled.div`
    margin: 140px auto 0 auto;
    max-width: 500px;
    width: 100%;
    color: white;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const FormLabel = styled.p`    
    font-size: 30px;    
    margin-bottom: 20px;
`
const Input = styled.input`
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0.5em;
    margin: 0.5em;
    color: black;
    background: white;
    border: none;
    border-radius: 8px;
    width: 300px;
    height: 40px;
    text-align:center;
    outline: none;

    &:focus {
        &::placeholder {
            opacity: 0;            
        }
    }

    &::placeholder {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        text-align:center;    
    }
`;

const Button = styled.button`    
    cursor: pointer;
    text-transform: uppercase;
    font-size: 18px;
    border-radius: 50px;    
    border: 2px solid #832e2e;
    margin: 20px 0;
    width: 300px;
    height: 40px;
    transition: 0.2s ease-in-out;

    &:hover {
        background: linear-gradient(90deg, rgba(107, 3, 3, 1) 0%, rgba(193, 54, 3, 1) 50%, rgba(107, 3, 3, 1) 100%);
        color: white;
    }
`
const Nota = styled.p`
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
    cursor: pointer;
`

const LabelBox = styled.label`
    cursor: pointer;
    padding-left: 5px;
`