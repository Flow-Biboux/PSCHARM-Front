import './App.css';
import { useState } from 'react';
import { Connection, PublicKey, clusterApiUrl, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import idl from './idl.json';

import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import FormSub from './formSub';

const wallets = [ getPhantomWallet() ]


const { SystemProgram, Keypair } = web3;
const baseAccount = Keypair.generate();
const opts = {
  preflightCommitment: "processed"
}
const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl('devnet');
const {
	TOKEN_PROGRAM_ID,
	getTokenAccount,
	createMint,
	createTokenAccount,
	mintToAccount,
} = require("./utils");



function App() {
  const [value, setValue] = useState('');
  const [dataList, setDataList] = useState([]);
  const [input, setInput] = useState('');
  const [myVar,setMyvar]= useState('');
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
      await program.rpc.initialize("Hello World", {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount]
      });

      const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
      console.log('account: ', account);
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

  async function mintIt(){
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    const mint = await createMint(provider, provider.wallet.publicKey);
    console.log("1");
    const mintAccount = await createTokenAccount(provider, mint, provider.wallet.publicKey);
    console.log("2 " + mintAccount);
    mintToAccount(provider, mint, mintAccount, 1, provider.wallet.publicKey);
    setTimeout( function(){console.log("3"); }, 5000);
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
      console.log(myVar);
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

 
  }

  if (!wallet.connected) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop:'100px' }}>
        <WalletMultiButton />
      </div>
    )
  } else {
    return (
      <div className="App">
        <div>
          {
            !value && (<button onClick={initialize}>Initialize</button>)
          }

          {
            value ? (
              <div>
                <h2>Current value: {value}</h2>
                <input
                  placeholder="Add new data"
                  onChange={e => setInput(e.target.value)}
                  value={input}
                />

                <FormSub setMyvar={setMyvar} />
                Myvar : {myVar}
                
                <button onClick={update}>Add data</button>
                <button onClick={mintIt}>Create Mint</button>
              </div>
            ) : (
              <h3>Please Inialize.</h3>
            )
          }
          {
            dataList.map((d, i) => <h4 key={i}>{d}</h4>)
          }
        </div>
      </div>
    );
  }
}

const AppWithProvider = () => (
  <ConnectionProvider endpoint={network}>
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <App />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
)

export default AppWithProvider; 