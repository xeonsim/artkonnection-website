const { CONTRACT_ABI, CONTRACT_ADDRESS } = require("./config.js");

const Caver = require("caver-js");
const rpcURL = "https://api.baobab.klaytn.net:8651/";
const caver = new Caver(rpcURL);

const contract = new caver.klay.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const _tokenURI = async (_tokenID) => {
  return await contract.methods
    .tokenURI(Number(_tokenID))
    .call()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

let a;
const _verify = async (_tokenID) => {
  const _bool = await _tokenURI(_tokenID);
  console.log(_bool);
};

