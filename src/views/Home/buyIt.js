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
import { connect } from "react-redux";
import { compose } from "redux";


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
const network = clusterApiUrl("mainnet-beta");
const decimals = 9;

function BuyIt() {
    // const [myVar, setMyvar] = useState(null);
    const [myJson, setMyJson] = useState(null);
    const [myImg, setMyImg] = useState(null);
    const [nSol, setNSol] = useState(null);
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
        if (nSol) {
            console.log("Buy sol (", nSol, ") process launched");
            asAcc(nSol)
        }
    }, [nSol])

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
                        <FormSub2 SubmitForm={submitForm} />
                        <form onSubmit={handleSubmit(buySub)}>                            
                            <FormLabel>Number of sol: </FormLabel><Input
                                type="uint"
                                name="nSol"
                                placeholder="How much solana you want to buy ?"
                                {...register('nSol', { required: true })}
                            />
                            <Button > Pay {nSol} sol to receve PSCHARM</Button>
                        </form>
                        <Nota> Nota: Mint will fail if auto-approve isn"t activated </Nota>
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
    font-family: "Playfair Display", serif;
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
const FormGroup = styled.div`
   display:flex; 
`
const FormLabel = styled.label`
    width:120px;
    text-align: right;
    padding-right: 20px;
    padding-top:12px
    color:#fff;
`
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: #2b0000;
  background: #fff1f1;
  border: none;
  border-radius: 8px;
  width: 90%;
  height: 28px;
  text-align:center;
`;