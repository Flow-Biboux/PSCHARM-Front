import Arweave from 'arweave';

async function pushArweave(Data) {

  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,     // Network request timeouts in milliseconds
    logging: true,     // Enable network request logging
  });

  const data = JSON.stringify(Data);
  console.log('JSON data : \n', data);
  let transaction = await arweave.createTransaction({ data: data });
  transaction.addTag('Content-Type', 'application/json');
  await arweave.transactions.sign(transaction);

  const response = await arweave.transactions.post(transaction);

  console.log("transaction :\n", transaction);
  console.log("response  :\n", response);
  console.log("response status :\n", response.status);
  const link = "https://s6wqxn7czv6cfb6y755dzi4utx2ya7otp4azlzvq64xy56ojodra.arweave.net/" + transaction.id;
  console.log('link to JSON : \n ', link);

  return link
}

export { pushArweave }