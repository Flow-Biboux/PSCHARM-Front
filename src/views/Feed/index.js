import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds } from '../../store/actions/Feed';
import FeedCard from './FeedCard'
import { clusterApiUrl } from '@solana/web3.js';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const wallets = [getPhantomWallet()]
const network = clusterApiUrl('devnet');

function Feed() {
    const dispatch = useDispatch();
    const { feedList } = useSelector((state) => state.FeedReducer);
    const [feeds, setFeeds] = useState([])
    const wallet = useWallet()

    // console.log(wallet);

    useEffect(() => {
        dispatch(getFeeds());
    }, [])

    useEffect(() => {
        if (feedList) {
            setFeeds(feedList)
        }
    }, [feedList])

    // render feed list
    const renderFeedList = () => {
        let data = [];
        if (feeds && feeds.length) {
            feeds.map((val, index) => {
                data.push(
                    <FeedCard 
                        wallet={wallet}
                        key={index}
                        NFTPicture={val.imageName}
                        url ={val.imageUrl}                    
                    />                     
                )
            })
        }
        return data;
    }

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

        document.addEventListener("contextmenu", (event) => {
            event.preventDefault();
          });

        return (
            <Wrap>
                <Container>
                    {renderFeedList()}
                </Container>
            </Wrap>
        )
    }
}

const FeedWithProvider = () => (
    <ConnectionProvider endpoint={network}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <Feed />
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
)

export default FeedWithProvider

const Button = styled.button`
background-color:#fff;
padding:10px 20px;
border-radius:5px;
margin-top:10px;
margin-left: auto;
display: block;
margin-right: 20px;
background: #eda3a3;
font-size: 16px;
border: none;
`

const Wrap = styled.div`
    margin-top: 120px;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto;
    color: white;
    .feed-card { 
        display: flex;
        flex-direction: column;
        /* width: 190px; */
    }
    .feed-card-img { 
        /* height: 80px;
        width: 190px; */
    }
    .text {
        overflow-wrap: break-word;;
    }
`
const Table = styled.table`
    width:100%;
    border-spacing: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;

    tr{
        display: flex;
        flex-direction: column;
        flex: 0 0 33%;
    }

    tr td{
        padding: 8px 0;
    }
    tr td:nth-child(2){
        border-bottom: 1px solid #744242;
        margin-bottom: 12px;
        padding-bottom: 20px;
    }
`