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

    const IDEAL_TRANSCATION_COUNT = 50;
    const IDEAL_USD_BALANCE = 200;
    const IDEAL_ETH_BALANCE = 0.1;
    const IDEAL_ERC20_COUNT =  15;
    const IDEAL_NFT_COUNT =  30;

    const mainnetTransactions = await getTransactions("https://eth.hypersync.xyz/query", userAddress);
    const arbitrumTransactions = await getTransactions("https://arbitrum.hypersync.xyz/query", userAddress);
    const optimismTransactions = await getTransactions("https://optimism.hypersync.xyz/query", userAddress);
    // const baseTransactions = await getTransactions("https://base.hypersync.xyz/query", userAddress);
    // const gnosisTransactions = await getTransactions("https://gnosis.hypersync.xyz/query", userAddress);

    const mainnetProvider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com');
    const arbitrumProvider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
    const optimismProvider = new ethers.providers.JsonRpcProvider('https://mainnet.optimism.io');
    // const baseProvider = new ethers.providers.JsonRpcProvider('https://base.llamarpc.com');
    // const gnosisProvider = new ethers.providers.JsonRpcProvider('https://rpc.gnosis.gateway.fm');
    
    const mainnetETHBalance = +(ethers.utils.formatEther(await mainnetProvider.getBalance(userAddress)));
    const arbitrumETHBalance = +(ethers.utils.formatEther(await arbitrumProvider.getBalance(userAddress)));
    const optimismETHBalance = +(ethers.utils.formatEther(await optimismProvider.getBalance(userAddress)));
    // const baseETHBalance = +(ethers.utils.formatEther(await baseProvider.getBalance(userAddress)));
    // const gnosisETHBalance = +(ethers.utils.formatEther(await gnosisProvider.getBalance(userAddress)));

    const mainnetERC20s = await getERC20s("eth", userAddress, MORALIS_API_KEY);
    const arbitrumERC20s = await getERC20s("arbitrum", userAddress, MORALIS_API_KEY);
    const optimismERC20s = await getERC20s("optimism", userAddress, MORALIS_API_KEY);
    // const baseERC20s = await getERC20s("base", userAddress, MORALIS_API_KEY);
    // const gnosisERC20s = await getERC20s("gnosis", userAddress, MORALIS_API_KEY);

    const mainnetNFTs = await getNFTs("eth", userAddress, MORALIS_API_KEY);
    const arbitrumNFTs = await getNFTs("arbitrum", userAddress, MORALIS_API_KEY);
    const optimismNFTs = await getNFTs("optimism", userAddress, MORALIS_API_KEY);
    // const baseNFTs = await getNFTs("base", userAddress, MORALIS_API_KEY);
    // const gnosisNFTs = await getNFTs("gnosis", userAddress, MORALIS_API_KEY);

    let mainnetUSDBalance = 0; for (let token of mainnetERC20s) { mainnetUSDBalance += token.usd_value; }
    let arbitrumUSDBalance = 0; for (let token of arbitrumERC20s) { arbitrumUSDBalance += token.usd_value; }
    let optimismUSDBalance = 0; for (let token of optimismERC20s) { optimismUSDBalance += token.usd_value; }
    // let baseUSDBalance = 0; for (let token of baseERC20s) { baseUSDBalance += token.usd_value; }
    // let gnosisUSDBalance = 0; for (let token of gnosisERC20s) { gnosisUSDBalance += token.usd_value; }

    const totalUSDBalance = mainnetUSDBalance + arbitrumUSDBalance + optimismUSDBalance; // + baseUSDBalance + gnosisUSDBalance;
    const totalETHBalance = mainnetETHBalance + arbitrumETHBalance + optimismETHBalance; // + baseETHBalance + gnosisETHBalance;
    const totalTransactions = mainnetTransactions.fromTransactions.length + mainnetTransactions.toTransactions.length 
                          + arbitrumTransactions.fromTransactions.length + arbitrumTransactions.toTransactions.length 
                          + optimismTransactions.fromTransactions.length + optimismTransactions.toTransactions.length;
                          // + baseTransactions.fromTransactions.length + baseTransactions.toTransactions.length 
                          // + gnosisTransactions.fromTransactions.length + gnosisTransactions.toTransactions.length;

    const totalERC20s = [...mainnetERC20s, ...arbitrumERC20s, ...optimismERC20s, /*...baseERC20s, ...gnosisERC20s*/];
    const totalNFTs = [...mainnetNFTs, ...arbitrumNFTs, ...optimismNFTs, /*...baseNFTs, ...gnosisNFTs*/];

    const mainnetScore = ((mainnetTransactions.fromTransactions.length + mainnetTransactions.toTransactions.length)/IDEAL_TRANSCATION_COUNT) * 30 
                       + (mainnetUSDBalance/IDEAL_USD_BALANCE) * 20 
                       + (mainnetETHBalance/IDEAL_ETH_BALANCE) * 30 
                       + (mainnetERC20s.length/IDEAL_ERC20_COUNT) * 10 
                       + (mainnetNFTs.length/IDEAL_NFT_COUNT) * 10;

    const arbitrumScore = ((arbitrumTransactions.fromTransactions.length + arbitrumTransactions.toTransactions.length)/IDEAL_TRANSCATION_COUNT) * 30
                        + (arbitrumUSDBalance/IDEAL_USD_BALANCE) * 20
                        + (arbitrumETHBalance/IDEAL_ETH_BALANCE) * 30
                        + (arbitrumERC20s.length/IDEAL_ERC20_COUNT) * 10
                        + (arbitrumNFTs.length/IDEAL_NFT_COUNT) * 10;

    const optimismScore = ((optimismTransactions.fromTransactions.length + optimismTransactions.toTransactions.length)/IDEAL_TRANSCATION_COUNT) * 30
                        + (optimismUSDBalance/IDEAL_USD_BALANCE) * 20
                        + (optimismETHBalance/IDEAL_ETH_BALANCE) * 30
                        + (optimismERC20s.length/IDEAL_ERC20_COUNT) * 10
                        + (optimismNFTs.length/IDEAL_NFT_COUNT) * 10;

    // const baseScore = ((baseTransactions.fromTransactions.length + baseTransactions.toTransactions.length)/IDEAL_TRANSCATION_COUNT) * 30
                        //  + (baseUSDBalance/IDEAL_USD_BALANCE) * 20
                        //  + (baseETHBalance/IDEAL_ETH_BALANCE) * 30
                        //  + (baseERC20s.length/IDEAL_ERC20_COUNT) * 10
                        //  + (baseNFTs.length/IDEAL_NFT_COUNT) * 10;

    // const gnosisScore = ((gnosisTransactions.fromTransactions.length + gnosisTransactions.toTransactions.length)/IDEAL_TRANSCATION_COUNT) * 30
                        //  + (gnosisUSDBalance/IDEAL_USD_BALANCE) * 20
                        //  + (gnosisETHBalance/IDEAL_ETH_BALANCE) * 30
                        //  + (gnosisERC20s.length/IDEAL_ERC20_COUNT) * 10
                        //  + (gnosisNFTs.length/IDEAL_NFT_COUNT) * 10;

    const totalScore = (mainnetScore + arbitrumScore + optimismScore /*+ baseScore + gnosisScore*/) / 3;
    
    LitActions.setResponse({response: JSON.stringify({
        total: {
            score: totalScore,
            transactions: totalTransactions,
            usdBalance: totalUSDBalance,
            ethBalance: totalETHBalance,
            erc20Count: totalERC20s.length,
            nftCount: totalNFTs.length
        },
        mainnet: {
            score: mainnetScore,
            transactions: mainnetTransactions.fromTransactions.length + mainnetTransactions.toTransactions.length,
            usdBalance: mainnetUSDBalance,
            ethBalance: mainnetETHBalance,
            erc20Count: mainnetERC20s.length,
            nftCount: mainnetNFTs.length,
        },
        arbitrum: {
            score: arbitrumScore,
            transactions: arbitrumTransactions.fromTransactions.length + arbitrumTransactions.toTransactions.length,
            usdBalance: arbitrumUSDBalance,
            ethBalance: arbitrumETHBalance,
            erc20Count: arbitrumERC20s.length,
            nftCount: arbitrumNFTs.length,
        },
        optimism: {
            score: optimismScore,
            transactions: optimismTransactions.fromTransactions.length + optimismTransactions.toTransactions.length,
            usdBalance: optimismUSDBalance,
            ethBalance: optimismETHBalance,
            erc20Count: optimismERC20s.length,
            nftCount: optimismNFTs.length,
        },
        // base: {
        //     score: baseScore,
        //     transactions: baseTransactions.fromTransactions.length + baseTransactions.toTransactions.length,
        //     usdBalance: baseUSDBalance,
        //     ethBalance: baseETHBalance,
        //     erc20Count: baseERC20s.length,
        //     nftCount: baseNFTs.length,
        // },
        // gnosis: {
        //     score: gnosisScore,
        //     transactions: gnosisTransactions.fromTransactions.length + gnosisTransactions.toTransactions.length,
        //     usdBalance: gnosisUSDBalance,
        //     ethBalance: gnosisETHBalance,
        //     erc20Count: gnosisERC20s.length,
        //     nftCount: gnosisNFTs.length,
        // }
    })});
})();