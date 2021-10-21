import Arweave from 'arweave';

export const arKey={
  "kty": "RSA",
  "e": "AQAB",
  "n": "r8H7FeTiW-MUFWiadjQcSzW2_K-bgyNZhAmueuVkARZw4GRlE2UeRlUtkmOIe0tIAaECZoXDD9hxz5yEfS34HBMaYRFK95GidPF9c74wK2iXe1__0NuMws04uSJ1xXIYufuXoVlys3x4CMCcf4YgG-9lp7v3bPjmeRQqRlzQXPHaCFXGsFmxiWvnysu_8FLVzxuHWywDv0mkMypZrKIeAxzzKTkRqlfIoumR2RGMwzpye5lFdBcqIoSwhLVqaAEI6zZkWh0FcLojw3vt0SLioux8J9fnAD51GnFoFRAEKRtE6WwUl1NcPB_4bPDeVE551Pi8gdqnG7ssW-uRi4wj2gwPRAf1KN-BFSvIbTserzH-RQ3c8jvvT3Tu7M38WLtrEm78TI_vAq34qkGkE1nKfiKoFRvWJPPUZrWhHkCp7V9O4CFOP5Xq79EPKt_JAzRvbJbdYDDXMe-0alaSv0ydhaj5qM36-UIMz6EipKLgHuyRP67af7JvluaGb9oWSW48wRKftuKB5202gnfevKHt-VM5clOdRl9L2pQIYZF9Ll9rdroU-6ppFYEz8jhriiBRNIsMhpumx579-2Z9ua12FgG7l4Qu4p2HcwjJ29VP3dUM1pixlY9K-lGzRAwTBO1uidjR1Nml7xGB5p8zJSaldoiUo3iuxd7B7I-YEWnNgLc",
  "d": "FTBDZxAjvTnNgzKL-IxvYske09dkiJ_mMUsCLBJj3Cu1P6AVfWFB5URsjOA5-nSIwZrZvBFhLZOwTiag5FR6kQE5O2gxy6cqLi3_gUjK7C4c9lnhmxofc0v5YXxcNV78Hc53072sXHi4zIP9T0m_V47PXbQv79pmh-9HP29TYU5432tehjEcpvlexYM1vbEcJ0Plgrd2MNqdvzCvrzu7dtryck730xDn1m1me1moc3rO2sQPbEpEoUpc23WMK-4AAhdEbDFhJVtovK7qlz1nlDECsMJQY3ukHiQmN5p-3ekfMC2ATVQBORsOQIKd_beY7B9xM7hv-qG13H5e8AiyOOpzkH88psUs-cFbt79O9D6GxMdbrJAPGtNu7l21YJxT41lbtrOlKL7fYWJ2KfAN1GoEekt7frBjZOXQCbl2g5uZGWdeHw8nQahXNK5xnxAYi0kAxeVY2_AfZhAWureyqrKlMWJc3tNKFpdBUO7627Jap5Haa9zz2bAd53fzim0Ce9BP910X2Cq8-oqe8ORrw6PKre9OhaozKbWYOkCIMvXlBhQpVUYUYIpvNGhZkP4kM7rHO2JSt8no6EpV858PbxyhyGHDpS14CD6elw3-7Kf96Rc9gbBIZpEwV1T2UJJlPkE8HzEirgH_G5ctrqdujSDdrl_QKc8lJOlvVcMtMg0",
  "p": "5yWoLfBm6RJEpQRzkneQtsr_q7kgfXh8xTGE1zPJDzoNXxVSvuw5E-mRHgUvRFpKgZwc1OzFHVx1YtwFugExFHZc1RHaDKBTV5FBVq5DubhzUdud8G2MMO5ZKDkcZXKWl9bar53NqD8sCr1k_mxqmketvCjnt4yoP4LKkKLnvCBzy2uvFJJcguDyzbzXgwaZXF7jxCz2V-yHajdThXxD_DfpSIGdXHhH-tyTY99bRU_EY5lT_7gAv3pbhVge5X6VgBGWv6EUFVk8S8aKEKVMGEStKM-_3j77K314gGh7om0MtQhkPwwMAbt6o0VrWHKRC-PpcOlckj00poyBx3Fc5Q",
  "q": "wqe6JI8lFbmSokUejtrFXziV97D1Qmt5sFCUtMX9u_-FQbOYf03I3ymGMojfNKSpNXSH1tSRJAIkgt9KlMSIqYAdoL528BjX0Ka7cdzZjNyRoaFnrKA8J3wjAfz8FeJCpc270hfQW6S9wGFX7xyzQvHS0j5nepXRMellxgjkZwBGVwngKhyVUw03KACn6F3kiKaas1i23q0TVweeajD70Qm-lISuheCPcEMts8NsEPbY0USsqhE83s-oyDS7b6pFwTkrUgeJRm-p44ydoOVCi40CjjqCcUAiwtveetsSpygcs9Dxdlpt2S4SZSODNz5i4lXHPVc0NwsFeM8Ega8paw",
  "dp": "3toGgGwDu_gZ6IMXLgJKqoGi6BwvP-j3WmM4sQbDdQPCOobjZSF4kkMg3zGedacbqEQr4_l2va0Tm8GHX-KgQBsxu1dfw8abM5TeysRulVNJE4XKizAC9nYFzWrqfsBwgmnqI2DgE7L8MkqRYV6DlMVAsmU5qlRZLgpaZAI7q7waB-iFPy8xNBnO3h6QJUoqd80giVXUF8b6c6RtyQeawEPjjT0xyyJIO4uIKsUASR3zuRbtzmDHj9RXAoOIHjjhyDys-4pAQ6jqIiCDojLL36Xu0KcjVBGitTZeBGc3s8yxcKRrigGCXfUz8tAOA5NJVo5g1bSXxIJwDZbv1KruJQ",
  "dq": "fE3VzeDngr8Vx7Ax-nH0VoFxK1KC3J57gD-FJwfEp9hdxX4l5S3MF86RlxXWy-xW7f7zfBoUcZU4saZcHzJ-PxfEU9EtbNfAgcrnqqeo-Y4lJb1H0nIk1-YrCOsAJA1wGCeQSHLSqKNEVWUUXWrLgvWgdohJVnvzslbkmhk1mh0PzidNUjccmIO49D-u-fFzrlwOMHd3mC2YSxxfalrLhEsfvAIa3P1xO_R6a_Bgw1iPTtv3E0ecwoCDvQ4HoCBxGRoj8udDH4rRR7GVO5kL7MfomOD-Scn2KM91fKkHeV1hLudAOx82RNlp_9I0ygN57CVw7VgRzRCptuMkcphj7w",
  "qi": "1pU0TgoQSYW8T7bT3IKc7nyW7eJImbYYa5YBHubJkTDN1vhGI319VXUfxryHmfSEclT7bWZzuF02PynO2S5ppV6F4jTHxEuM2CezpITTUpC0khGDl--m68GiUvLVz3_pq1YTNekClzVxedxbvCOsupyE0qtCfJo_5BuGpl8e7BXdPIE0wB5dSErFd-EMSO1st1uUCh2L-7Cc-PEVPW4b3KtGuDitS_VqAq3V1caPASgz6c_v7ROu8mw2VhnfP3aWkfm4iSC7eHPCA3nRb1nJFL7fjXKFO_A8CcbrdhO-RUxd3gqLo_NF9Ct8i12qTGd7LeUH6_ktIDRWroA1lj2bRw"
};
export const arAddress = '-aWiZNs8Bdfoi-kdMLv4DjTJFz58KgSo0RpUnALy5-U';

async function pushArweave(Data) {

  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
    timeout: 20000,     // Network request timeouts in milliseconds
    logging: true,     // Enable network request logging
  });

  const data = JSON.stringify(Data);
  console.log('JSON data to push : \n', data);
  let transaction = await arweave.createTransaction({ data: data },arKey);
  transaction.addTag('Content-Type', 'application/json');
  await arweave.transactions.sign(transaction,arKey);

  const response = await arweave.transactions.post(transaction, arKey);

  // console.log("transaction :\n", transaction);
  // console.log("response  :\n", response);
  // console.log("response status :\n", response.status);
  const link = "https://s6wqxn7czv6cfb6y755dzi4utx2ya7otp4azlzvq64xy56ojodra.arweave.net/" + transaction.id;
  console.log('link to JSON : \n ', link);

  return link
}

export { pushArweave }