import { executeInLit } from "./lit-protocol.js";
import { attest } from "./sign.js";

import { PinataSDK } from "pinata-web3";
import { Blob } from "buffer";
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import fs from 'fs';

const app = express();
const port = 4000;

app.use( express.json() );
app.use( cors() );

app.listen(port, () => {console.log(`Server is running on port ${port}.`);});

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.IPFS_GATEWAY,
});

app.post('/get-analytics', async (req, res) => {
    
    const userAddress = req.body.userAddress;
    console.log(`Analytics of ${userAddress} is calculating..`);

    const userAnalytics = await executeInLit(userAddress);

    const blob = new Blob([fs.readFileSync("./src/assets/nft.png")]);
    const file = new File([blob], "image.png", { type: "image/png"})
    const imageCID = (await pinata.upload.file(file)).IpfsHash;
    const tokenURI = (await pinata.upload.json({
        name: "Persona Score NFT",
        image: `ipfs://${imageCID}`,
        description: `Total Score: ${userAnalytics.total.score}\n
                      Mainnet Score: ${userAnalytics.mainnet.score}\n
                      Arbitrum Score: ${userAnalytics.arbitrum.score}\n
                      Optimism Score: ${userAnalytics.optimism.score}`,
    })).IpfsHash;

    await attest(parseInt(userAnalytics.total.score), userAddress, tokenURI);
    // TODO: score may be float, how to handle this?

    res.send(userAnalytics);

});