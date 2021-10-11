/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

//snippet-sourcedescription:[s3_PhotoExample.js demonstrates how to manipulate photos in albums stored in an Amazon S3 bucket.]
//snippet-service:[s3]
//snippet-keyword:[JavaScript]
//snippet-sourcesyntax:[javascript]
//snippet-keyword:[Code Sample]
//snippet-keyword:[Amazon S3]
//snippet-sourcetype:[full-example]
//snippet-sourcedate:[]
//snippet-sourceauthor:[AWS-JSDG]

// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photo-album.html

// snippet-start:[s3.JavaScript.photoAlbumExample.complete]
// snippet-start:[s3.JavaScript.photoAlbumExample.config]
import AWS from "aws-sdk";
///////////////
const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const {
  fromCognitoIdentityPool,
} = require("@aws-sdk/credential-provider-cognito-identity");
const { S3Client, PutObjectCommand, ListObjectsCommand, DeleteObjectCommand, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
//////////////
var albumBucketName = "charmtokensolana";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:738ee708-ea68-4bb1-b1b2-b4aa6eed4244";


AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: albumBucketName }
});
// snippet-end:[s3.JavaScript.photoAlbumExample.config]

// snippet-start:[s3.JavaScript.photoAlbumExample.listAlbums]
////////////////////////////////////::
// A utility function to create HTML
// function getHtml(template) {
//   return template.join("\n");
// }
// // Make getHTML function available to the browser
// window.getHTML = getHtml;

// // List the photo albums that exist in the bucket
// const listAlbums = async () => {
//   try {
//     const data = await s3.send(
//         new ListObjectsCommand({ Delimiter: "/", Bucket: albumBucketName })
//     );
// console.log(data);
//     if (data.CommonPrefixes === undefined) {
//       const htmlTemplate = [
//         "<p>You don't have any albums. You need to create an album.</p>",
//         "<button onclick=\"createAlbum(prompt('Enter album name:'))\">",
//         "Create new album",
//         "</button>",
//       ];
//       document.getElementById("Album").innerHTML = htmlTemplate;
//     } else {
//       var albums = data.CommonPrefixes.map(function (commonPrefix) {
//         var prefix = commonPrefix.Prefix;
//         var albumName = decodeURIComponent(prefix.replace("/", ""));
//         return getHtml([
//           "<li>",
//           "<span onclick=\"deleteAlbum('" + albumName + "')\">X</span>",
//           "<span onclick=\"viewAlbum('" + albumName + "')\">",
//           albumName,
//           "</span>",
//           "</li>",
//         ]);
//       });
//       var message = albums.length
//           ? getHtml([
//             "<p>Click an album name to view it.</p>",
//             "<p>Click the X to delete the album.</p>",
//           ])
//           : "<p>You do not have any albums. You need to create an album.";
//       const htmlTemplate = [
//         "<h2>Albums</h2>",
//         message,
//         "<ul>",
//         getHtml(albums),
//         "</ul>",
//         "<button onclick=\"createAlbum(prompt('Enter Album Name:'))\">",
//         "Create new Album",
//         "</button>",
//       ];
//       document.getElementById("app").innerHTML = getHtml(htmlTemplate);
//     }
//   } catch (err) {
//     return alert("There was an error listing your albums: " + err.message);
//   }
// };

// // Make listAlbums function available to the browser
// window.listAlbums = listAlbums;
//////////////////////////////////:

function getHtml(template) {
  return template.join('\n');
}

// window.getHTML = getHtml();


function listAlbums() {
  s3.listObjects({ Delimiter: "/" }, function (err, data) {
    if (err) {
      return alert("There was an error listing your albums: " + err.message);
    } else {
      var albums = data.Contents.map(function (Contents) {
        var prefix = Contents.Key;
        var albumName = decodeURIComponent(prefix.replace("/", ""));

        return getHtml([
          "<li>",
          `<button onClick="deleteAlbum('${albumName}')"> -X- </button>`,
          // "<button onClick=\"{ ()=> deleteAlbum('" + albumName + "') }\"> -X- </button>",
          `<button onClick="viewAlbum('${albumName}')">`,
          albumName,
          "</button>",
          "</li>",
        ]);
      });

      var message = albums.length
        ? getHtml([
          "<p>Click on an album name to view it.</p>",
          "<p>Click on the X to delete the album.</p>"
        ])
        : "<p>You do not have any albums. Please Create album.</p>";

      var htmlTemplate = [
        "<h2>Albums</h2>",
        message,
        "<ul>",
        getHtml(albums),
        "</ul>",
        // "<button", 
        // "onClick={()=>createAlbum(prompt('enter name'))}",
        // ">Create New Album2</button>",        
        `<button onClick="createAlbum(prompt('Enter Album Name:'))" >`,
        'Create New Album',
        "</button>"
      ];

      console.log("1");
      document.getElementById("album").innerHTML = getHtml(htmlTemplate);
    }
  });
}

window.listAlbums = listAlbums;
// snippet-end:[s3.JavaScript.photoAlbumExample.listAlbums]

// snippet-start:[s3.JavaScript.photoAlbumExample.createAlbum]
function createAlbum(albumName) {
  albumName = albumName.trim();
  if (!albumName) {
    return alert("Album names must contain at least one non-space character.");
  }
  if (albumName.indexOf("/") !== -1) {
    return alert("Album names cannot contain slashes.");
  }
  var albumKey = encodeURIComponent(albumName);
  s3.headObject({ Key: albumKey }, function (err, data) {
    if (!err) {
      return alert("Album already exists.");
    }
    if (err.code !== "NotFound") {
      return alert("There was an error creating your album: " + err.message);
    }
    s3.putObject({ Key: albumKey }, function (err, data) {
      if (err) {
        return alert("There was an error creating your album: " + err.message);
      }
      alert("Successfully created album.");
      viewAlbum(albumName);
    });
  });
}
window.createAlbum = createAlbum;
// snippet-end:[s3.JavaScript.photoAlbumExample.createAlbum]

// snippet-start:[s3.JavaScript.photoAlbumExample.viewAlbum]
function viewAlbum(albumName) {
  var albumPhotosKey = encodeURIComponent(albumName) + "/";
  s3.listObjects({ Prefix: albumPhotosKey }, function (err, data) {
    if (err) {
      return alert("There was an error viewing your album: " + err.message);
    }
    // 'this' references the AWS.Response instance that represents the response
    console.log("Viewing elements");
    var href = this.request.httpRequest.endpoint.href;
    var bucketUrl = href + albumBucketName + "/";

    var UrlExpireSeconds = 180 * 1;
    console.log("data.Contents S3", data.Contents);
    var photos = data.Contents.map(function (photo) {
      var photoKey = photo.Key;
      var params = {
        Bucket: albumBucketName,
        Key: photoKey,
        Expires: UrlExpireSeconds
      };

      var photoUrl = s3.getSignedUrl('getObject', params);
      console.log('photoUrl S3 : ',photoUrl);
      //var photoUrl = bucketUrl + encodeURIComponent(photoKey);
      return getHtml([
        "<span>",
        "<div>",
        '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
        "</div>",
        "<div>",
        "<button onClick=\"deletePhoto('" +
        albumName +
        "','" +
        photoKey +
        "')\">",
        "X",
        "</button>",
        "<span>",
        photoKey.replace(albumPhotosKey, ""),
        "</span>",
        "</div>",
        "</span>"
      ]);
    });
    var message = photos.length
      ? "<p>Click on the X to delete the photo</p>"
      : "<p>You do not have any photos in this album. Please add photos.</p>";
    var htmlTemplate = [
      "<h2>",
      "Album: " + albumName,
      "</h2>",
      message,
      "<div>",
      getHtml(photos),
      "</div>",
      '<input id="photoupload" type="file" accept="image/*">',
      /// make Pubkey = file
      '<button id="addphoto" onClick="addPhoto(\'' + albumName + "')\">",
      "Add Photo",
      "</button>",
      '<button onClick="listAlbums()">',
      "Back To Albums",
      "</button>"
    ];
    document.getElementById("album").innerHTML = getHtml(htmlTemplate);
  });
}


// snippet-end:[s3.JavaScript.photoAlbumExample.viewAlbum]

// snippet-start:[s3.JavaScript.photoAlbumExample.addPhoto]
function addPhoto(albumName, mintPubKey) {
  var files = document.getElementById("photoupload").files;
  if (!files.length) {
    return alert("Please choose a file to upload first.");
  }
  var file = files[0];
  var fileName = file.name;

  // const ext = fileName.lastIndexOf(".")
  // const extesion = fileName.substring(ext)
  // var photoKey = mint+extesion
  var albumPhotosKey = encodeURIComponent(albumName) + "/";
  console.log(photoKey);

  const ext = fileName.lastIndexOf(".")

  const extension = fileName.substring(ext)

  const key = mintPubKey + extension

  var photoKey = albumPhotosKey + key;
  console.log("photok", photoKey);
  // Use S3 ManagedUpload class as it supports multipart uploads
  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: photoKey,
      Body: file
    }
  });

  var promise = upload.promise();

  promise.then(
    function (data) {
      alert("Successfully uploaded photo.");
      viewAlbum(albumName);
    },
    function (err) {
      return alert("There was an error uploading your photo: ", err.message);
    }
  );
}
window.addPhoto = addPhoto;
// snippet-end:[s3.JavaScript.photoAlbumExample.addPhoto]

// snippet-start:[s3.JavaScript.photoAlbumExample.deletePhoto]
function deletePhoto(albumName, photoKey) {
  s3.deleteObject({ Key: photoKey }, function (err, data) {
    if (err) {
      return alert("There was an error deleting your photo: ", err.message);
    }
    alert("Successfully deleted photo.");
    viewAlbum(albumName);
  });
}
window.deletePhoto = deletePhoto;
// snippet-end:[s3.JavaScript.photoAlbumExample.deletePhoto]

// snippet-start:[s3.JavaScript.photoAlbumExample.deleteAlbum]
function deleteAlbum(albumName) {
  var albumKey = encodeURIComponent(albumName) + "/";

  s3.listObjects({ Prefix: albumKey }, function (err, data) {
    if (err) {
      return alert("There was an error deleting your album: ", err.message);
    }
    var objects = data.Contents.map(function (object) {
      return { Key: object.Key };
    });
    s3.deleteObjects(
      {
        Delete: { Objects: objects, Quiet: true }
      },
      function (err, data) {
        if (err) {
          return alert("There was an error deleting your album: ", err.message);
        }
        alert("Successfully deleted album.");
        listAlbums();
      }
    );
  });
}
window.deleteAlbum = deleteAlbum;
// snippet-end:[s3.JavaScript.photoAlbumExample.deleteAlbum]
// snippet-end:[s3.JavaScript.photoAlbumExample.complete]


export { deleteAlbum, deletePhoto, addPhoto, viewAlbum, createAlbum, listAlbums, getHtml }
