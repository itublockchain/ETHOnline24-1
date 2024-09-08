(async ()  => {
    let res = await fetch("http://localhost:4000/get-analytics", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userAddress: "0xB675053201bb1567E2AE3CD33C1A0F8407F311eE"
        })
    }); res = await res.json();

    console.log(res);
})();