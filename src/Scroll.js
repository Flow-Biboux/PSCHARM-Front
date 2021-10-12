import AWS from "aws-sdk";
import React from "react";

export function Scroll() {

    var albumBucketName = "charmtokensolana";
    // var bucketRegion = "us-east-1";
    // var IdentityPoolId = "us-east-1:738ee708-ea68-4bb1-b1b2-b4aa6eed4244";

    var s3 = new AWS.S3({ apiVersion: "2006-03-01", params: { Bucket: albumBucketName } });
    console.log("scrolll");
    // s3.listObjects();
    s3.listObjects(function (err, data) {
        if (err) {
            return alert("There was an error viewing your album: " + err.message);
        }

        var UrlExpireSeconds = 180 * 1;
        console.log('data.Contents Scrolll :',data.Contents);

        var photos = data.Contents.map(function (photo) {
            var photoKey = photo.Key;
            var params = {
                Bucket: albumBucketName,
                Key: photoKey,
                Expires: UrlExpireSeconds
            };

            var photoUrl = s3.getSignedUrl('getObject', params);
            // console.log("photourl Scrolll:", photoUrl);

            const items = [];

            for (let i = 0; i < photoUrl.length; i++) {
                items.push(<img src={photoUrl[i]} alt="Girl in a jacket" width="500" height="600" />);
            }

            return <ul>{items}</ul>

        });

        // console.log("photos from Scroll.js", photos);
    });
    //     return(
    // <ul>{items}</ul>
    //     )
}

export default Scroll;