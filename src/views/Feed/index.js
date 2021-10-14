import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getFeeds } from '../../store/actions/Feed';

function Feed() {
    const dispatch = useDispatch();
    const { feedList } = useSelector((state) => state.FeedReducer);
    const [feeds, setFeeds] = useState([])

    const getFeedItems = () => {
        dispatch(getFeeds());
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
                data.push(<tr key={index}>
                    <td> {val.imageUrl ? <img src={val.imageUrl} height={100} width={150}></img> : "-"}</td>
                    <td style={{color:"#fff"}}> {val.imageName ? val.imageName : "-"} </td>
                </tr>)
            })
        }
        return data;
    }


    return (
        <Wrap>
            <Button onClick={getFeedItems}><i class="fas fa-sync-alt"></i> Refresh list </Button>

            <Table>
                {/* <tr>
                    <th>Image name</th>
                    <th>Image</th>
                    <th></th>
                </tr> */}
                {renderFeedList()}
            </Table>
        </Wrap>
    )
}

export default Feed

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
`

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    color: white;
    .feed-card { 
        display: flex;
        flex-direction: column;
        width: 190px;
    }
    .feed-card-img { 
        height: 80px;
        width: 190px;
    }
    .text {
        overflow: hidden;
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