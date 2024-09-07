import {
    SignProtocolClient,
    SpMode,
    EvmChains,
    OffChainSignType,
} from "@ethsign/sp-sdk";
  
// import { privateKeyToAccount } from "viem/accounts";
  
// const privateKey = "0x..."; // Optional
const client = new SignProtocolClient(SpMode.OffChain, {
    signType: OffChainSignType.EvmEip712,
    // account: privateKeyToAccount(privateKey), // Optional
});
  
export async function attest(_score) {
    if(_score===undefined){
        throw new Error("Score undefined")
    }

    // Create schema
    const schemaInfo = await client.createSchema({
        name: "score",
        data: [{ name: "score", type: "uint256" }],
    });
  
    console.log(schemaInfo)

    // Create attestation
    const attestationInfo = await client.createAttestation({
        schemaId: schemaInfo.schemaId, 
        data: { score: _score },
        indexingValue: "score",
    });
  
    console.log(attestationInfo)
    return  attestationInfo.attestationId
}