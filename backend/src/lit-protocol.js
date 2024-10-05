import { createSiweMessageWithRecaps, generateAuthSig, LitAbility, LitActionResource } from "@lit-protocol/auth-helpers";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LIT_RPC, LitNetwork } from "@lit-protocol/constants";
import { PinataSDK } from "pinata-web3";
import { ethers } from "ethers";
import 'dotenv/config';

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.IPFS_GATEWAY,
});

export async function executeInLit (userAddress) {

    const ethersSigner = new ethers.Wallet(
        process.env.PRIVATE_KEY,
        new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
    );

    const litNodeClient = new LitNodeClient({
        litNetwork: LitNetwork.DatilDev,
        debug: false,
    });
    await litNodeClient.connect();

    const sessionSigs = await litNodeClient.getSessionSigs({
        chain: "ethereum",
        expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
        resourceAbilityRequests: [
            {
                resource: new LitActionResource("*"),
                ability: LitAbility.LitActionExecution,
            },
        ],
        authNeededCallback: async ({
            resourceAbilityRequests,
            expiration,
            uri,
        }) => {
            const toSign = await createSiweMessageWithRecaps({
                uri: uri,
                expiration: expiration,
                resources: resourceAbilityRequests,
                walletAddress: ethersSigner.address,
                nonce: await litNodeClient.getLatestBlockhash(),
                litNodeClient,
            });

            return await generateAuthSig({
                signer: ethersSigner,
                toSign,
            });
        },
    });

    try {
        const data = await pinata.gateways.get(`https://${process.env.IPFS_GATEWAY}/ipfs/${process.env.LIT_ACTION_IPFS_CID}`,);
        let res = await litNodeClient.executeJs({
            sessionSigs,
            code: data.data,
            jsParams: {
                userAddress: userAddress,
                MORALIS_API_KEY: process.env.MORALIS_API_KEY,
            }
        }); res = await JSON.parse(res.response);
        
        return res;
    } catch (error) {
        console.error(error);
    }

}