import '../../App.css';
import React, { useState, useEffect } from 'react';
import idl from '../../idl.json';
import { Link } from 'react-router-dom';

import { Connection, PublicKey, clusterApiUrl, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { Program, Provider, web3, BN } from '@project-serum/anchor';
import { useWallet, } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import FormSub from './formSub';
import { blurAddPhoto, addPhoto, getLink, viewAlbum } from "../../s3";
import { pushArweave } from '../../pushArweave';
import { connect } from "react-redux";
import { compose } from 'redux';
import * as actions from '../../store/actions/index';

import { getMetadataAccount, decodeMetadata } from '../../metadata'

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
const network = clusterApiUrl('devnet');


function Home() {
    const [value, setValue] = useState('');
    const [dataList, setDataList] = useState([]);
    const [input, setInput] = useState('');
    const [myVar, setMyvar] = useState('');
    const [myJson, setMyJson] = useState('');
    const [myImg, setMyImg] = useState('');
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

    async function initialize() {
        const provider = await getProvider();
        /* create the program interface combining the idl, program ID, and provider */
        const program = new Program(idl, programID, provider);
        try {
            /* interact with the program via rpc */
            await program.rpc.initialize("----", {
                accounts: {
                    baseAccount: baseAccount.publicKey,
                    user: provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                },
                signers: [baseAccount]
            });

            const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
            // console.log('account: ', account);
            setValue(account.data.toString());
            setDataList(account.dataList);
            console.log('initialize done');
        } catch (err) {
            console.log("Transaction error: ", err);
        }
    }

    async function update() {
        if (!input) return
        const provider = await getProvider();
        const program = new Program(idl, programID, provider);
        await program.rpc.update(input, {
            accounts: {
                baseAccount: baseAccount.publicKey
            }
        });

        const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
        console.log('account: ', account);
        setValue(account.data.toString());
        setDataList(account.dataList);
        setInput('');
    }

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
        console.log('charmpda : \n', charmpda);

        await program.rpc.setAuthority({
            accounts: {
                signer: provider.wallet.publicKey,
                mint: uSDmint,
                pda: charmpda,
                tokenProgram: TOKEN_PROGRAM_ID,
            }
        });

        console.log('done pda mint');

    }

    async function faucet() {

        const provider = await getProvider();
        const program = new Program(idl, programID, provider);

        const ttusdMint = new PublicKey('Gz2anxAVzZM3ZdZJgPhgWy38Wyw8G1UazMLwfj3TUuGR');
        const usrAccount = new PublicKey('J4X2zHqE4BHHRETreaLmrP7eDtyZtLrjfCBqHdtkXeBY');
        const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
        console.log("2 :ttusdMint : " + ttusdMint);
        console.log("2 :TOKEN_PROGRAM_ID : " + TOKEN_PROGRAM_ID);

        const [charmpda, nonce1] = await web3.PublicKey.findProgramAddress(
            ["charmpda"],
            programID
        );
        console.log('charmpda : \n', charmpda.toBase58());
        console.log('programID : \n', programID.toBase58());

        await program.rpc.faucet(nonce1, {
            accounts: {
                signer: provider.wallet.publicKey,
                mint: ttusdMint,
                userAccount: usrAccount,
                pda: charmpda,
                tokenProgram: TOKEN_PROGRAM_ID,
            }

        });

        console.log('done mint USD');


    }
    async function proxyTransfer() {

        const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
        const provider = await getProvider();
        const program = new Program(idl, programID, provider);

        const ttusdMint = new PublicKey('Gz2anxAVzZM3ZdZJgPhgWy38Wyw8G1UazMLwfj3TUuGR');
        const usrAccount = new PublicKey('13opLWUkvRDPPqQ4hcYcSpMtZmCR9ApPVt7JJwCmhUPq');
        const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
        console.log("2 :ttusdMint : " + ttusdMint);
        console.log("2 :TOKEN_PROGRAM_ID : " + TOKEN_PROGRAM_ID);

        console.log('programID : \n', programID.toBase58());

        const fromdAddress = await PublicKey.findProgramAddress(
            [
                provider.wallet.publicKey.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                ttusdMint.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        )
        console.log('fromdAddress :\n', fromdAddress)

        const toAddress = await PublicKey.findProgramAddress(
            [
                usrAccount.toBuffer(),
                TOKEN_PROGRAM_ID.toBuffer(),
                ttusdMint.toBuffer(),
            ],
            SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
        )
        console.log('toAddress :\n', toAddress)

        await program.rpc.proxyTransfer(new BN(10000000), {
            accounts: {
                authority: provider.wallet.publicKey,
                from: fromdAddress[0],
                to: toAddress[0],
                tokenProgram: TOKEN_PROGRAM_ID,
            }

        });

        console.log('done transfer USD');


    }

    async function mintIt() {

        const provider = await getProvider();
        const program = new Program(idl, programID, provider);
        const mint = await createMint(provider, provider.wallet.publicKey);
        console.log("1: create Mint Account : \n", mint.toBase58());

        // uploading blurred image and clear image
        await blurAddPhoto(mint.toBase58(), provider.wallet.publicKey.toBase58())
        await addPhoto(mint.toBase58(), provider.wallet.publicKey.toBase58())


        console.log(" myJson : \n", myJson);
        const arrayMyJson = JSON.parse(myJson)
        // console.log('arrayMyJson : \n', arrayMyJson);
        arrayMyJson.image = 'http://www.mytest111111.com.s3-website-us-east-1.amazonaws.com' + '/' + provider.wallet.publicKey.toBase58() + '/' + mint.toBase58() + '.png';
        console.log(" metadataToAr : \n", arrayMyJson);

        // const tempWeave = await pushArweave(arrayMyJson);

        // if (await tempWeave.length <= 65) {
        // const linkAr = tempWeave + '------'

        // else {
        //     linkAr = tempWeave.padEnd(65, '-')
        // };
        // console.log('linkAr : \n', linkAr);
        const metadataToMint = myVar + '-----------------------------------------------------------------'//linkAr;

        console.log('metadataToMint : \n', metadataToMint);

        const mintAccount = await createTokenAccount(provider, mint, provider.wallet.publicKey);
        console.log("mintAccount : \n" + mintAccount);

        mintToAccount(provider, mint, mintAccount, 1, provider.wallet.publicKey);
        console.log("4: Minted to mintAccount");



        const metadataMainAccount = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
        const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
        const [metadataAccount, _nonce1] = await web3.PublicKey.findProgramAddress(
            ["metadata", metadataMainAccount.toBuffer(), mint.toBuffer()],
            metadataMainAccount
        );
        const [masterEditionAccount, _nonce2] = await web3.PublicKey.findProgramAddress(
            ["metadata", metadataMainAccount.toBuffer(), mint.toBuffer(), "edition"],
            metadataMainAccount);
        console.log('masterEditionAccount :\n ', masterEditionAccount.toBase58());
        console.log('Metadatas to add to mint Account : \n', metadataToMint);
        console.log('mint.toBase58() : \n', mint.toBase58());
        console.log('provider.publicKey : \n', provider.wallet.publicKey.toBase58());

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

        // get metadata account that holds the metadata information
        const m = await getMetadataAccount(mintAccount) //new PublicKey('EMu2TFePyLxMc3ppd1Ea7xRzTSmxXzBMAkHoQYFJKLNv'));
        console.log("metadata acc: ", m);

        // get the account info for that account
        const accInfomasterEditionAccount = await provider.connection.getAccountInfo(masterEditionAccount);
        // console.log('accInfomasterEditionAccount : \n',deserialize(METADATA_SCHEMA,accInfomasterEditionAccount.data));
        console.log('accInfomasterEditionAccount : \n', decodeMetadata(accInfomasterEditionAccount.data));

        // finally, decode metadata
        // console.log("decoded : \n", decodeMetadata(accInfo.data).data);

        const linkExploNFT = 'https://explorer.solana.com/address/' + mintAccount.toBase58() + '?cluster=devnet';
        alert('votre NFT a bien été crée, son nom sur la blockchain est : \n' + mintAccount.toBase58());
        window.open(linkExploNFT);
    }

    const submitForm = (data) => {
        let nName = '';
        if (data.name.length < 20) {
            nName = data.name.padEnd(20, '-')
        } else if (data.name.length > 20) {
            nName = data.name.slice(0, 20)
        };

        let nSymb = '';
        if (data.symbol.length < 4) {
            nSymb = data.symbol.padEnd(4, '-')
        } else {
            nSymb = data.symbol.slice(0, 4)
        };

        const NNN = nName + nSymb;

        setMyvar(NNN);

        console.log('data :\n', data);
        const shortData = { ...data };
        delete shortData.photoupload;
        console.log('shortData :\n', shortData);

        const jsondata = JSON.stringify(shortData);
        setMyJson(jsondata)

        console.log('Stringified Json : \n', jsondata);
        console.log('Stringed Name + Symbol :\n', NNN);

        console.log("File loaded :\n", data.photoupload[0].name);

        setMyImg(data.photoupload[0])


    }

    useEffect(() => {
        if (myVar && myJson && myImg) {
            mintIt()
        }
    }, [myVar, myJson, myImg])


    if (!wallet.connected) {
        return (
            <div className="divwallet">
                Please select the wallet you want to use to connect to Charm :
                <div style={{ marginTop: '30px' }}>
                    <WalletMultiButton />
                </div>
            </div>
        )
    } else {
        return (
            <div className="home">
                <div>
                    {value ? (
                        <div className='baseee'>
                            <FormSub SubmitForm={submitForm} />
                            <button onClick={proxyTransfer} > ProxyTransfer</button>
                            <div id='album' />
                            <br />
                        </div>
                    ) : (
                        <div className='sayyes'>
                            <h3>Click Yes to Enter:</h3>
                            <p>By clicking "Yes" you certify you are over 18 years old and agree to the CHARM terms of use</p>
                            <p>Please aprove the connection to access Charm App :</p>
                        </div>
                    )
                    }

                    {dataList.map((d, i) => <h4 key={i}>{d}</h4>)}

                    {!value && (<button onClick={initialize} className="bbutton">Yes!</button>)}
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
