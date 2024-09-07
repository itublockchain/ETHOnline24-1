import { ethers } from "ethers";
import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";


const privateKey = "0x..."; // Private key
const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.sepolia,
    account: privateKeyToAccount(privateKey), // Optional if you are using an injected provider
  });



const hookContractAddress = "0xacbdAa5175f07f8A042Ebf24281e838c11709Cc9"; // MyAttestationHook kontrat adresi
const hookContractAbi = [
    "function didReceiveAttestation(address attester, uint64 schemaId, uint64 attestationId, bytes  extraData) external payable"
];



async function attest(_score) {

    if (_score === undefined) {
        throw new Error("Score undefined");
    }

    const encodedScore = ethers.utils.defaultAbiCoder.encode(["uint256"], [_score]);
    console.log("Encoded Score with ethers.js:", encodedScore);
    console.log("Encoded Score Length:", encodedScore.length);
   
    // Schema oluşturma sırasında hook'u belirtin
    const schemaInfo = await client.createSchema({
        name: "score",
        data: [{ name: "score", type: "uint256" }],
        hook: hookContractAddress  // Burada Hook kontrat adresini belirtin
    });

    console.log(schemaInfo);

    // Attestation oluşturma
    const attestationInfo = await client.createAttestation({
        schemaId: schemaInfo.schemaId,
        data: { score: _score },
        indexingValue: "score",
    },{
        extraData:encodedScore
    });

    console.log(attestationInfo);

    return attestationInfo.attestationId;
}

attest(5).then((response) => console.log(response));

export { attest };
