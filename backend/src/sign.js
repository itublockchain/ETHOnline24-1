import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";
import { ethers } from "ethers";
import 'dotenv/config';
import fs from 'fs';

const hookContractAddress = JSON.parse(fs.readFileSync('./src/sign-contract/contract-address.json')).address; // MyAttestationHook Contract Address
// const hookContractAbi = JSON.parse(fs.readFileSync('./src/sign-contract/contract-abi.json')).abi; // MyAttestationHook Contract ABI

const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.sepolia,
    account: privateKeyToAccount('0x' + process.env.PRIVATE_KEY),
});

export async function attest(score, recipient, tokenURI) {
    
    if (score === undefined) {
        throw new Error("Score undefined");
    }

    const encodedData = ethers.utils.defaultAbiCoder.encode(
        ["uint256", "address", "string"], 
        [score, recipient, `https://ipfs.io/ipfs/${tokenURI}`]
    );

    const schemaInfo = await client.createSchema({
        name: "score",
        data: [{ name: "score", type: "uint256" }],
        hook: hookContractAddress
    });

    console.log(schemaInfo);

    const attestationInfo = await client.createAttestation({
        schemaId: schemaInfo.schemaId,
        data: { score: score},
        indexingValue: "score"
    },{
        extraData:encodedData
    });

    console.log(attestationInfo);

    return attestationInfo.attestationId;

}