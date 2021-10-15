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