import AWS from "aws-sdk";
import FeedCard from "./components/FeedCard";

export function Scroll() {

    function getHtml(template) {
      return template.join("\n");
    }

    const albumBucketName = "charmtokensolana";
    // const bucketRegion = "us-east-1";
    // const IdentityPoolId = "us-east-1:738ee708-ea68-4bb1-b1b2-b4aa6eed4244";

    const s3 = new AWS.S3({ apiVersion: "2006-03-01", params: { Bucket: albumBucketName } });
    console.log("scrolll");     

    const test = []

    s3.listObjects( function (err, data) {
        if (err) {
            return alert("There was an error viewing your album: " + err.message);
        }

        const UrlExpireSeconds = 180 * 1;

        const photos = data.Contents.map(function (photo) {
            const photoKey = photo.Key;
            const params = {
                Bucket: albumBucketName,
                Key: photoKey,
                Expires: UrlExpireSeconds
            };

            const photoUrl = s3.getSignedUrl('getObject', params);
            // console.log("photourl Scrolll:", photoUrl);

            test.push(photoUrl)

            // return photoUrl;

            // return <FeedCard NFTPicture={photoUrl} />
            return getHtml([
                // <FeedCard NFTPicture={photoUrl} />
                "<div class='feed-card'>",
                '<img class="feed-card-img" src="' + photoUrl + '"/>',
                `<p class="text">${photoKey.slice(0, 4) + "..." + photoKey.slice(-8)}</p>`,
                `<a href="/mint">Go to Mint</a>`,
                "</div>",
            ]);

            
            // const items = [];

            // for (let i = 0; i < photoUrl.length; i++) {
            //     items.push(<img src={photoUrl[i]} alt="Girl in a jacket" width="500" height="600" />);
            // }

            // return <ul>{items}</ul>

        });
        // console.log("INSIDE", test);
        // console.log("photos", photos);
        
        
        document.getElementById("album").innerHTML = getHtml(photos);
    });
    

}

export default Scroll;