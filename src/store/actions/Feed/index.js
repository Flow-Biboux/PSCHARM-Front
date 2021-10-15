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

      const albumBucketNameBlurred='www.mytest111111.com';
      const s3Blur = new AWS.S3({
          apiVersion: "2006-03-01",
          params: { Bucket: albumBucketNameBlurred }
      });   


      const items = []


      s3Blur.listObjects(function (err, data) {
        if (err) {
          dispatch(getFeedsSucess([]))
          return alert("There was an error viewing your album: " + err.message);
        }
        const UrlExpireSeconds = 180 * 1;
        data.Contents.map(function (photo) {
          const photoKey = photo.Key;
          const paramsBlur = {
            Bucket: albumBucketNameBlurred,
            Key: photoKey,
            Expires: UrlExpireSeconds
          };
          
          const photoUrlBlur = s3Blur.getSignedUrl('getObject', paramsBlur);

          items.push({
            imageUrl: photoUrlBlur,
            imageName: photoKey
          })
      });
      dispatch(getFeedsSucess(items))
    });
  }
  // ) 
}