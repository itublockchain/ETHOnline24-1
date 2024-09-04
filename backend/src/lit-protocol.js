import { createSiweMessageWithRecaps, generateAuthSig, LitAbility, LitActionResource } from "@lit-protocol/auth-helpers";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LIT_RPC, LitNetwork } from "@lit-protocol/constants";

import { ethers } from "ethers";

import 'dotenv/config';
import fs from "fs";

export async function executeInLit () {

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

    // const litActionCode = fs.readFileSync("./src/ml-algorithm.js", "utf8");
    // let res = await litNodeClient.executeJs({
    //     sessionSigs,
    //     code: litActionCode
    // });

    try {
        let res = await litNodeClient.executeJs({
            sessionSigs,
            ipfsId: process.env.LIT_ACTION_IPFS_CID,
        });
        console.log(res.response);
    } catch (error) {
        console.error(error);
    }

}