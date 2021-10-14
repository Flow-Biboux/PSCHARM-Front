import Arweave from 'arweave';
import TestWeave from 'testweave-sdk';

async function pushArweave(Data) {
  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
  });

  const data = JSON.stringify(Data);
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
  
  console.log("transaction :", transaction);
  console.log("uploader :", uploader);
  const link = "www.arweave.net/" + uploader.transaction.id;
  console.log('link to JSON : \n ',link);

  return link

}

export { pushArweave }