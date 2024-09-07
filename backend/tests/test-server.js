(async ()  => {
    let res = await fetch("http://localhost:4000/get-analytics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userAddress: "0x419c65BD8D14575C1d8Af07734b4ff39599af84f"
        })
    }); res = await res.json();

    console.log(res);
})();