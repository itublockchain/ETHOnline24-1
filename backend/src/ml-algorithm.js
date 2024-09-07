async function getTransactions(_chainURL, _address) {
    
    // 30 Transactions per query for ENVIO

    let fromTransactions = await fetch(_chainURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "from_block": 0,
            "transactions": [
                {
                    "from": [_address],
                }
            ],
            "field_selection": {
                "block": [
                    "timestamp"
                ],
                "transaction": [
                    "hash",
                    "chain_id",
                    "value",
                    "from"
                ]
            },
        })
    }); fromTransactions = await fromTransactions.json(); fromTransactions = fromTransactions.data;

    let toTransactions = await fetch(_chainURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "from_block": 0,
            "transactions": [
                {
                    "to": [_address],
                }
            ],
            "field_selection": {
                "block": [
                    "timestamp"
                ],
                "transaction": [
                    "hash",
                    "chain_id",
                    "value",
                    "from"
                ]
            },
        })
    }); toTransactions = await toTransactions.json(); toTransactions = toTransactions.data;

    return {fromTransactions: fromTransactions, toTransactions: toTransactions};

}

async function getERC20s(_chain, _address, _apiKey) {

    const output = [];
    let response = await fetch(`https://deep-index.moralis.io/api/v2.2/wallets/${_address}/tokens?chain=${_chain}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': _apiKey
        }    
    }); response = await response.json();
    
    for (let token of response.result) {
        output.push({
            name: token.name,
            symbol: token.symbol,
            usd_value: (token.usd_value != null) ? token.usd_value : 0,
        });
    }

    return output;

}

async function getNFTs(_chain, _address, _apiKey) {

    const output = [];
    let response = await fetch(`https://deep-index.moralis.io/api/v2.2/${_address}/nft?chain=${_chain}&format=decimal&media_items=false'`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': _apiKey
        }    
    }); response = await response.json();
    
    for (let NFT of response.result) {
        output.push({
            name: NFT.name,
            symbol: NFT.symbol,
        });
    }

    return output;

}

(async () => {

    const mainnetTransactions = await getTransactions("https://eth.hypersync.xyz/query", userAddress);
    const arbitrumTransactions = await getTransactions("https://arbitrum.hypersync.xyz/query", userAddress);
    // const zksyncTransactions = await getTransactions("https://zksync.hypersync.xyz/query", userAddress);
    // const scrollTransactions = await getTransactions("https://scroll.hypersync.xyz/query", userAddress);
    const optimismTransactions = await getTransactions("https://optimism.hypersync.xyz/query", userAddress);

    const mainnetProvider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com');
    const arbitrumProvider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
    // const zksyncProvider = new ethers.providers.JsonRpcProvider('https://1rpc.io/zksync2-era');
    // const scrollProvider = new ethers.providers.JsonRpcProvider('https://scroll.drpc.org');
    const optimismProvider = new ethers.providers.JsonRpcProvider('https://mainnet.optimism.io');
    
    const mainnetETHBalance = +(ethers.utils.formatEther(await mainnetProvider.getBalance(userAddress)));
    const arbitrumETHBalance = +(ethers.utils.formatEther(await arbitrumProvider.getBalance(userAddress)));
    // const zksyncETHBalance = +(ethers.utils.formatEther(await zksyncProvider.getBalance(userAddress)));
    // const scrollETHBalance = +(ethers.utils.formatEther(await scrollProvider.getBalance(userAddress)));
    const optimismETHBalance = +(ethers.utils.formatEther(await optimismProvider.getBalance(userAddress)));

    const mainnetERC20s = await getERC20s("eth", userAddress, MORALIS_API_KEY);
    const arbitrumERC20s = await getERC20s("arbitrum", userAddress, MORALIS_API_KEY);
    // const zksyncERC20s = await getERC20s("", userAddress, MORALIS_API_KEY); // Moralis is not supporting zkSync
    // const scrollERC20s = await getERC20s("", userAddress, MORALIS_API_KEY); // Moralis is not supporting scroll
    const optimismERC20s = await getERC20s("optimism", userAddress, MORALIS_API_KEY);

    const mainnetNFTs = await getNFTs("eth", userAddress, MORALIS_API_KEY);
    const arbitrumNFTs = await getNFTs("arbitrum", userAddress, MORALIS_API_KEY);
    // const zkSyncNFTs = await getNFTs("", userAddress, MORALIS_API_KEY); // Moralis is not supporting zkSync
    // const scrollNFTs = await getNFTs("", userAddress, MORALIS_API_KEY); // Moralis is not supporting scroll
    const optimismNFTs = await getNFTs("optimism", userAddress, MORALIS_API_KEY);

    let mainnetUSDBalance = 0; for (let token of mainnetERC20s) { mainnetUSDBalance += token.usd_value; }
    let arbitrumUSDBalance = 0; for (let token of arbitrumERC20s) { arbitrumUSDBalance += token.usd_value; }
    let optimismUSDBalance = 0; for (let token of optimismERC20s) { optimismUSDBalance += token.usd_value; }

    LitActions.setResponse({response: JSON.stringify({
        mainnet: {
            usdBalance: mainnetUSDBalance,
            ethBalance: mainnetETHBalance,
            transactions: mainnetTransactions.fromTransactions.length + mainnetTransactions.toTransactions.length,
            nftCount: mainnetNFTs.length,
            erc20Count: mainnetERC20s.length,
        },
        arbitrum: {
            usdBalance: arbitrumUSDBalance,
            ethBalance: arbitrumETHBalance,
            transactions: arbitrumTransactions.fromTransactions.length + arbitrumTransactions.toTransactions.length,
            nftCount: arbitrumNFTs.length,
            erc20Count: arbitrumERC20s.length,
        },
        optimism: {
            usdBalance: optimismUSDBalance,
            ethBalance: optimismETHBalance,
            transactions: optimismTransactions.fromTransactions.length + optimismTransactions.toTransactions.length,
            nftCount: optimismNFTs.length,
            erc20Count: optimismERC20s.length,
        }
    })});
})();