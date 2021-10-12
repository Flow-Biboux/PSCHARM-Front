import '../App.css';
import React, { useState } from 'react';
import idl from '../idl.json';
import { Link } from 'react-router-dom';

import { Connection, PublicKey, clusterApiUrl, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import FormSub from '../formSub';
import Album from '../Album';
import { addPhoto, viewAlbum } from "../s3";
import { pushArweave } from '../pushArweave';
// import { connection } from '@project-serum/common';
// import { Scroll } from './Scroll'
const {
    createMint,
    createTokenAccount,
    mintToAccount,
    } = require("../utils");
///////////////
// import AWS from "aws-sdk";

////////////////
const wallets = [getPhantomWallet()]


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


    /////////////
    // function getHtml2(template) {
    //   return template.join('\n');
    // }
    /////////:
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

    async function mintIt() {
        const provider = await getProvider();
        const program = new Program(idl, programID, provider);
        const mint = await createMint(provider, provider.wallet.publicKey);
        console.log("1", mint);

        const mintAccount = await createTokenAccount(provider, mint, provider.wallet.publicKey);
        console.log("2 :mintAccount : " + mintAccount);

        mintToAccount(provider, mint, mintAccount, 1, provider.wallet.publicKey);
        console.log("4");

        const metadataMainAccount = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
        const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
        const [metadataAccount, _nonce1] = await web3.PublicKey.findProgramAddress(
        ["metadata", metadataMainAccount.toBuffer(), mint.toBuffer()],
        metadataMainAccount
        );
        const [masterEditionAccount, _nonce2] = await web3.PublicKey.findProgramAddress(
        ["metadata", metadataMainAccount.toBuffer(), mint.toBuffer(), "edition"],
        metadataMainAccount);

        console.log("myVar : ", myVar);
        console.log("myImg : ", myImg);
        console.log('mint.toBase58()', mint.toBase58());
        console.log('provider.publicKey', provider.wallet.publicKey.toBase58());

        addPhoto(mint.toBase58(),provider.wallet.publicKey.toBase58())
        // viewAlbum(provider.wallet.publicKey.toBase58() +"/" +mint.toBase58())
        console.log(5);

        await program.rpc.metadata(myVar, {
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
        //////////////////////////:
        // var Listing = data.Contents.map(function (photo) {

        // var albumBucketName = "charmtokensolana";
        // var bucketRegion = "us-east-1";
        // var IdentityPoolId = "us-east-1:738ee708-ea68-4bb1-b1b2-b4aa6eed4244";
        // var s3 = new AWS.S3({ apiVersion: "2006-03-01", params: { Bucket: albumBucketName } });

        // var prefix = Contents.Key;
        // // var albumName = decodeURIComponent(prefix.replace("/", ""));
        // s3.listObjects(function (err, data) {
        //   if (err) {
        //     return alert("There was an error viewing your album: " + err.message);
        //   }

        //   var UrlExpireSeconds = 180 * 1;

        //   var photos = data.Contents.map(function (photo) {
        //   var photoKey = photo.Key;
        //   var params = {
        //     Bucket: albumBucketName,
        //     Key: photoKey,
        //     Expires: UrlExpireSeconds
        //   };

        //   var photoUrl = s3.getSignedUrl('getObject', params);
        //   console.log("photourl :", photoUrl);

        //   const items = [];

        //   // for (let i = 0; i < photoUrl.length; i++) {

        //   items.push(<img src={photoUrl[i]} width="500" height="600" />)

        // }
        //   document.getElementsByClassName("showImg") = {items};
        // return items;

        // const listingImg = items.map(function () {


        //   })
        //   return getHtml2([
        //     "<li>",
        //     // "<button onClick=\"{ ()=> deleteAlbum('" + albumName + "') }\"> -X- </button>",
        //     `<label>{photoUrl}</label>,`
        //     `<img src={${photoUrl}} width="500" height="600" />`,

        //     // "</button>",
        //     "</li>",
        //   ]);
        // });
        // document.getElementById("showImg").innerHTML = getHtml2(htmlTemplate);
        // // });



    }

    if (!wallet.connected) {
        return (
            <div className="divwallet">
                {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}> */}
                Please select the wallet you want to use to connect to Charm :
                {/* </div> */}
                <div style={{ marginTop: '30px' }}>

                <WalletMultiButton />
                </div>
            </div>
        )
    } else {
        return (
            <div className="home">  
            <div>

                {
                    value ? (
                        <div className='baseee'>

                        <FormSub setMyvar={setMyvar} setMyJson={setMyJson} setMyImg={setMyImg} />


                        {/* /// make Pubkey = file */}
                        {/* <button id="addphoto" onClick={addPhoto(prompt())}> */}
                        {/* Add Photo
                        </button> */}

                        {/* <button onClick={() => addPhoto(prompt())} >Create New Album2</button> */}

                        <p>
                            Myvar : {myVar}
                            <br />
                            MyJson : {myJson}
                            <br /></p>

                        {
                            myVar ? (
                            <div>
                                <button onClick={() => {
                                const data = myJson
                                pushArweave(data)
                                }

                                }
                                >Upload Json</button>
                            </div>
                            ) : (
                            ' submit values first '
                            )
                        }




                        <button onClick={mintIt}>Create Mint</button>
                        {/* <button onClick={Scroll}>List Img</button> */}
                        <Link to="/feed">List Img</Link>
                        {/* <div className='showImg' /> */}
                        {/* <Scroll/> */}


                        <p>---------------</p>
                        <Album />
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
                {
                    dataList.map((d, i) => <h4 key={i}>{d}</h4>)
                }
            </div>
            {
                !value && (<button onClick={initialize} className="bbutton">Yes!</button>)
            }
            </div>
        );
    }
}

const HomeWithProvider = () => (
    <ConnectionProvider endpoint={network}>
        <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            <Home />
        </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
)

export default HomeWithProvider;