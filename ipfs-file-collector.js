const Caver = require("caver-js");
const fs = require("fs");
const rpcURL = "https://api.baobab.klaytn.net:8651/";

/**
 * Example code about "Using IPFS with Caver."
 * Related article - Korean: https://medium.com/klaytn/caver%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-ipfs-%EC%82%AC%EC%9A%A9%EB%B2%95-4889a3b29c0b
 * Related article - English: https://medium.com/klaytn/using-ipfs-with-caver-964e1f721bfe
 */
async function main() {
  try {
    await run();
  } catch (err) {
    console.error(err);
  }
}

const run = async () => {
  const caver = new Caver(rpcURL);
  // Set connection with IPFS Node
  caver.ipfs.setIPFSNode("infura-ipfs.io", 5001, true);
  const testFile = `${__dirname}/Artkonnectionjson/`;

  // Add a file to IPFS with file path
    const cid = await caver.ipfs.add(testFile);
    console.log(`cid: ${cid}`);

  //   const cid = "QmQGwgQXkrv8zGbjaHv5WJj9QsRzh7L3eqnwYpwfj11Dfx/11.gltf";
  // const cid = "QmVsfVbZzwuQKNDexCNCZsi1KrPghfFLg25oBf5aVYXhkj";
  // // Download a file from IPFS
  // await caver.ipfs
  //   .get(cid)
  //   .then((res) => {
  //     console.log(res);
  //     const decode = Buffer.from(res, "base64");
  //     fs.writeFileSync("out1.png", decode);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  //   console.log(`Contents downloaded from IPFS: ${buffer}`);

  // Convert from CID to multihash(hex formatted)
  //   const multihash = await caver.ipfs.toHex(cid);
  //   console.log(`multihash: ${multihash}`);
};

main();
