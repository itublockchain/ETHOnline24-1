import { PinataSDK } from "pinata-web3";
import { Blob } from "buffer";
import 'dotenv/config';
import fs from "fs";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: "crimson-cautious-scorpion-703.mypinata.cloud",
});

(async () => {
    try {

      const blob = new Blob([fs.readFileSync("./src/ml-algorithm.js")]);
      const file = new File([blob], "ml-algorithm.js", { type: "text/plain"})
      const upload = await pinata.upload.file(file);
      console.log(upload);

      const envContent = fs.readFileSync('.env', 'utf-8');
      const updatedEnvContent = envContent.replace(/LIT_ACTION_IPFS_CID=.*/, `LIT_ACTION_IPFS_CID=${upload.IpfsHash}`);
      fs.writeFileSync('.env', updatedEnvContent, 'utf-8');
    
    } catch (error) {console.error(error);}
})();