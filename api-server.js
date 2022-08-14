const express = require("express");
const path = require("path");
const {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
} = require("./contract/artKonnection.js");
const Caver = require("caver-js");
const app = express();
const router = express.Router();
const port = 3000;

const rpcURL = "https://klaytn01.fandom.finance/";
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

app.get("/api/assets/:tokenNumber", async (req, res) => {
  const tokenNumber = req.params.tokenNumber;

  const _bool = await _tokenURI(tokenNumber);
  if (_bool) {
    try {
      res.sendFile(path.join(__dirname, `./assets/${tokenNumber}.png`));
    } catch (e) {
      console.log(e);
      try {
        res.sendFile(path.join(__dirname, `./assets/${tokenNumber}.gltf`));
      } catch (e) {
        res.sendFile(path.join(__dirname, `./coverassets/altcover.png`));
      }
    }
  } else {
    res.sendFile(path.join(__dirname, "./alt/alt.png"));
  }
});

app.get("/api/coverassets/:projectName", (req, res) => {
  const projectName = req.params.projectName;
  try {
    res.sendFile(path.join(__dirname, `./coverassets/${projectName}.png`));
  } catch (e) {
    console.log(e);
    res.sendFile(path.join(__dirname, `./coverassets/altcover.png`));
  }
});

app.get("/api/artkonnection/:tokenNumber", (req, res) => {
  const tokenNumber = req.params.tokenNumber;

  let _randNum = Math.floor(Math.random() * 5555) + 1;
  res.sendFile(path.join(__dirname, `./assets/${_randNum}.gltf`));
});

app.get("/api/alt_image", (req, res) => {
  res.sendFile(path.join(__dirname, `./alt/alt.png`));
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.use(router);
app.use(require("connect-history-api-fallback")());

app.use(express.static(path.join(__dirname, "dist")));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
