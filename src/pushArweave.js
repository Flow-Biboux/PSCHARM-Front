import Arweave from 'arweave';
import TestWeave from 'testweave-sdk';

async function pushArweave( Data ) {



    const arweave = Arweave.init({
      host: 'arweave.net',
      port: 443,
      protocol: 'https',
      timeout: 20000,     // Network request timeouts in milliseconds
      // logging: false,     // Enable network request logging
    });

const data=Data;

let transaction = await arweave.createTransaction({ data: data });


await arweave.transactions.sign(transaction);

let uploader = await arweave.transactions.getUploader(transaction);

while (!uploader.isComplete) {
  await uploader.uploadChunk();
  console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
console.log(uploader.toJSON);

}
console.log("transaction :",transaction);
console.log("uploader :",uploader);
console.log('mik to media : \n www.arweave.net/' ,uploader.transaction.id);
// const response = await arweave.transactions.post(transaction);

// console.log("response.data :",response.data);
// console.log("response.status :",response.status);




}

export { pushArweave }