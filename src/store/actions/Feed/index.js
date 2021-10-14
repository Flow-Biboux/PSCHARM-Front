import * as actionTypes from '../actionTypes';
import AWS from "aws-sdk";

// get feeds success
export const getFeedsSucess = (list) => ({
  type: actionTypes.FEEDS_LIST,
  payload: list,
});
var value = 0
// get feeds action
export const getFeeds = () => {
  
  // if (value !=0) (
    return dispatch => {
      
      const albumBucketName = 'www.mytest111111.com';
      const s3 = new AWS.S3({ apiVersion: "2006-03-01", params: { Bucket: albumBucketName } });
      const items = []
      s3.listObjects(function (err, data) {
        if (err) {
          dispatch(getFeedsSucess([]))
          return alert("There was an error viewing your album: " + err.message);
        }
        const UrlExpireSeconds = 180 * 1;
        data.Contents.map(function (photo) {
          const photoKey = photo.Key;
          const params = {
            Bucket: albumBucketName,
            Key: photoKey,
            Expires: UrlExpireSeconds
          };
          const photoUrl = s3.getSignedUrl('getObject', params);
          items.push({
            imageUrl: photoUrl,
            imageName: photoKey.slice(0, 3) + "..." +photoKey.slice(41, 48) + "..."+ photoKey.slice(-7)
          })
      });
      dispatch(getFeedsSucess(items))
    });
  }
  // ) 
}