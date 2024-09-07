const { ethers, artifacts } = require ("hardhat");
const fs = require("fs");

(async function () {

    const contract = await ethers.getContractFactory("Hook").then((contract) => contract.deploy());
    const contractsDir = "../backend/src/sign-contract";
    if (!fs.existsSync(contractsDir)) {fs.mkdirSync(contractsDir);} else {

        fs.writeFileSync(
            contractsDir + `/contract-address.json`,
            JSON.stringify({ address : contract.address }, undefined, 2)
        );
            
        fs.writeFileSync(
            contractsDir + `/contract-abi.json`,
            JSON.stringify({ abi : artifacts.readArtifactSync("Hook").abi }, null, 2)
        );

    }
    
})().then(() => {process.exit(0);}).catch((error) => {console.error(error); process.exit(1);});