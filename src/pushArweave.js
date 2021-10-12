import Arweave from 'arweave';
import TestWeave from 'testweave-sdk';

async function pushArweave( Data ) {

    // initializing connections
    // const arweave = Arweave.init({
    //     // host: '13.48.153.38',
    //     // port: 1984,
    //     // protocol: 'http',
    //     host: 'arweave.net',
    //     port: 443,
    //     protocol: 'https',
    //     timeout: 20000,
    //     logging: false,
    // });
    // init TestWeave on the top of arweave
    // const testWeave = await TestWeave.init(arweave);


    const arweave = Arweave.init({
      host: 'arweave.net',
      port: 443,
      protocol: 'https'
    });

const data=Data;
// const address =arweave.wallets.getAddress()
// console.log(address);
let transaction = await arweave.createTransaction({ data: data });
// transaction.addTag('Content-Type', 'text');

await arweave.transactions.sign(transaction);

let uploader = await arweave.transactions.getUploader(transaction);

while (!uploader.isComplete) {
  await uploader.uploadChunk();
  console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
console.log(uploader.toJSON);

}
 
const response = await arweave.transactions.post(transaction);

console.log(response.data);
console.log(response.status);











///////////:
// const data = `
// <html>
//   <head>
//     <meta charset="UTF-8">
//     <title>Info about arweave</title>
//   </head>
//   <body>
//     Arweave is the best web3-related thing out there!!!
//   </body>
// </html>`
// const dataTransaction = await arweave.createTransaction({
//   data,
// })

// await arweave.transactions.sign(dataTransaction)
// const statusBeforePost = await arweave.transactions.getStatus(dataTransaction.id)
// console.log(statusBeforePost); // this will return 404
// await arweave.transactions.post(dataTransaction)
// const statusAfterPost = await arweave.transactions.getStatus(dataTransaction.id)
// console.log(statusAfterPost); // this will return 202
// await arweave.mine();
// const statusAfterMine = await arweave.transactions.getStatus(dataTransaction.id)
// console.log(statusAfterMine); // this will return 200
////////////

    // console.log('data : \n', data , ' \n testweave :\n', testWeave);

    //     const dataTransaction = await arweave.createTransaction({
    //         data,
    //     }, testWeave.rootJWK)

    //     console.log('create TestWeave transaction', dataTransaction);
        

    //     await arweave.transactions.sign(dataTransaction, testWeave.rootJWK)
    //     const statusBeforePost = await arweave.transactions.getStatus(dataTransaction.id)
    //     console.log('statusBeforePost :',statusBeforePost); // this will return 404

    //     await arweave.transactions.post(dataTransaction)
    //     const statusAfterPost = await arweave.transactions.getStatus(dataTransaction.id)
    //     console.log('statusAfterPost :',statusAfterPost); // this will return 202

    //     await testWeave.mine();
    //     const statusAfterMine = await arweave.transactions.getStatus(dataTransaction.id)
    //     console.log('statusAfterMine :',statusAfterMine); // this will return 200

}

export { pushArweave }