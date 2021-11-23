import "../../App.css";
import React, { useState, useEffect } from "react";
import idl from "../../idl.json";
import styled from "styled-components"

import { useForm } from "react-hook-form";
import { Connection, PublicKey, clusterApiUrl, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { Program, Provider, web3, BN } from "@project-serum/anchor";
import { useWallet, } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

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

const network = clusterApiUrl("mainnet-beta");

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
            .then(res => res.json())
            .then(data => {
                setPSCHARM(data.price / 0.005)
            })
    }

    async function getProvider() {
        const connection = new Connection(network, opts.preflightCommitment);

        const provider = new Provider(
            connection, wallet, opts.preflightCommitment,
        );
        return provider;
    }


    async function asAcc(nSol) {

        const maxAccount = new PublicKey("Hjzu13Y262nDZCwNDtHURukEHryw9CmM5ZDFXqRN6Zxb")
        const SolFeedPricePubKey = new PublicKey('AdtRGGhmqvom3Jemp5YNrxd9q9unX36BZk1pujkkXijL');
        const provider = await getProvider();
        const program = new Program(idl, programID, provider);
        const tokenPurse = new PublicKey("HddDcpTXPrgYMfsErA9jHefMgUvoGaHxvjL1qVU6QYcs")

        const mint = new PublicKey("C4xWe67MMg5zJia7gZ8BmH2btvCfMeSMWRVWXCGvoAfG");  //PSCHARM 

        const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");

        const [charmpda, nonce1] = await web3.PublicKey.findProgramAddress(
            ["charmpda"],
            programID
        );
        console.log("charmpda :\n", charmpda.toBase58());

        const [fromdAddress, _nonce3] = await web3.PublicKey.findProgramAddress(
            [
                provider.wallet.publicKey.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                mint.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        )
        const dataas = await provider.connection.getBalance(fromdAddress);

        if (dataas === 0) {

            try {

                await program.rpc.createAssociatedAccount({
                    accounts: {
                        signer: provider.wallet.publicKey,
                        mint: mint,
                        userAccount: fromdAddress,
                        tokenProgram: TOKEN_PROGRAM_ID,
                        systemProgram: SystemProgram.programId,
                        rentProgram: SYSVAR_RENT_PUBKEY,
                        associatedProgram: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
                    }
                });
                console.log("associated account done");
            } catch (err) {
                console.log("Translating error", err);
            }

            await program.rpc.buyCharm(nonce1, new BN(nSol * 10 ** decimals), {
                accounts: {
                    signer: provider.wallet.publicKey,
                    tokenPurse: tokenPurse,
                    mint: mint,
                    userAccount: fromdAddress,
                    pda: charmpda,
                    aggregatorFeedAccount: SolFeedPricePubKey,
                    charmAccount: maxAccount,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId
                }
            });
            console.log("Number of Sol sent : ", nSol, " \n mint of PSCHARM: \n", mint.toBase58(), ' \n PSCHARM Public Address :\n', fromdAddress.toBase58());
            alert("Transfer is successfull, this is your account: \n", fromdAddress.toBase58(), "\n you can find it on the explorer!")
        } else {
            
            await program.rpc.buyCharm(nonce1, new BN(nSol * 10 ** decimals), {
                accounts: {
                    signer: provider.wallet.publicKey,
                    tokenPurse: tokenPurse,
                    mint: mint,
                    userAccount: fromdAddress,
                    pda: charmpda,
                    aggregatorFeedAccount: SolFeedPricePubKey,
                    charmAccount: maxAccount,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId
                }
            });

            console.log("Number of Sol sent : ", nSol, " \n mint of PSCHARM: \n", mint.toBase58(), ' \n PSCHARM Public Address :\n', fromdAddress.toBase58());
            alert("Transfer is successfull, this is your account: \n", fromdAddress.toBase58(), "\n you can find it on the explorer!")

        }
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
            <FormWrapper id="buy">

                <form onSubmit={handleSubmit(buySub)}>
                    <FormLabel className="roboto-light">Number of SOL you want to pay</FormLabel>
                    <Input
                        type="number"
                        name="nSol"
                        placeholder="Max: 37 Sol"
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
    padding-top: 126px;
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