import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds } from '../../store/actions/Feed';
import FeedCard from './FeedCard';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

function Feed() {
    const dispatch = useDispatch();    
    const { feedList } = useSelector((state) => state.FeedReducer);
    const [feeds, setFeeds] = useState([])
    const wallet = useWallet()

    // console.log(wallet);

    const toggleSelectWallet = () => {
        const selectWallet = document.querySelector("#select-wallet");

        selectWallet.classList.contains("select-wallet-active") ? selectWallet.classList.remove("select-wallet-active") : selectWallet.classList.add("select-wallet-active")
    }

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
                <p>
                    By ticking "Yes" I certify I'm over 18 years old.
                </p>
                <div>
                    <YesBox 
                        id="yes" 
                        type="checkbox"                            
                        onClick={toggleSelectWallet}
                    />
                    <label>Yes</label>
                    
                </div>
                
                <SelectWalletWrapper id="select-wallet" className="select-wallet">
                    <SelectWalletLegend>(click "Select wallet to connect to your wallet")</SelectWalletLegend>
                    <WalletMultiButton />
                </SelectWalletWrapper>
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


export default Feed

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
const SelectWalletWrapper = styled.div`
    display: none;

    &.select-wallet-active {
        display: block;
    }
`
const SelectWalletLegend = styled.p`
    margin-bottom: 30px;
`
const YesBox = styled.input`
    margin: 30px 0;
`