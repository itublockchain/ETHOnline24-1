async function getTransactions(_chainURL, _address) {
    
    //  30 Transactions per query for ENVIO

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

(async () => {

    const ethereumTransactions = await getTransactions("https://eth.hypersync.xyz/query", userAddress);
    const arbitrumTransactions = await getTransactions("https://arbitrum.hypersync.xyz/query", userAddress);
    const zksyncTransactions = await getTransactions("https://zksync.hypersync.xyz/query", userAddress);
    const scrollTransactions = await getTransactions("https://scroll.hypersync.xyz/query", userAddress);
    const optimismTransactions = await getTransactions("https://optimism.hypersync.xyz/query", userAddress);

    const ethereumProvider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com');
    const arbitrumProvider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
    const zksyncProvider = new ethers.providers.JsonRpcProvider('https://1rpc.io/zksync2-era');
    const scrollProvider = new ethers.providers.JsonRpcProvider('https://scroll.drpc.org');
    const optimismProvider = new ethers.providers.JsonRpcProvider('https://mainnet.optimism.io');
    
    const ethereumBalance = ethers.utils.formatEther(await ethereumProvider.getBalance(userAddress));
    const arbitrumBalance = ethers.utils.formatEther(await arbitrumProvider.getBalance(userAddress));
    const zksyncBalance = ethers.utils.formatEther(await zksyncProvider.getBalance(userAddress));
    const scrollBalance = ethers.utils.formatEther(await scrollProvider.getBalance(userAddress));
    const optimismBalance = ethers.utils.formatEther(await optimismProvider.getBalance(userAddress));


    LitActions.setResponse({response: JSON.stringify({
        ethereum: {
            balance: ethereumBalance,
            transactions: ethereumTransactions.fromTransactions.length + ethereumTransactions.toTransactions.length
        },
        arbitrum: {
            balance: arbitrumBalance,
            transactions: arbitrumTransactions.fromTransactions.length + arbitrumTransactions.toTransactions.length
        },
        zksync: {
            balance: zksyncBalance,
            transactions: zksyncTransactions.fromTransactions.length + zksyncTransactions.toTransactions.length
        },
        scroll: {
            balance: scrollBalance,
            transactions: scrollTransactions.fromTransactions.length + scrollTransactions.toTransactions.length
        },
        optimism: {
            balance: optimismBalance,
            transactions: optimismTransactions.fromTransactions.length + optimismTransactions.toTransactions.length
        }
    })});
})();