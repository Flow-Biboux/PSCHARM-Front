import '../../App.css';
import React from 'react';
import {  clusterApiUrl } from '@solana/web3.js';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import {  WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import Home from "./Home"

const wallets = [getPhantomWallet()]
const network = clusterApiUrl('devnet');

const Index = (props) => {
    return(
    <ConnectionProvider endpoint={network}>
        <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            <Home />
        </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
)};

export default Index;