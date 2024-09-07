import "dotenv/config";

const ethereumMoralis = await fetch(`https://deep-index.moralis.io/api/v2.2/wallets/${"0x419c65BD8D14575C1d8Af07734b4ff39599af84f"}/tokens?chain=eth`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'X-API-Key': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjEyZDYxMjVhLTU5ZTctNGEyMi04ZTMxLTViNTcyMzU5MzZkZSIsIm9yZ0lkIjoiNDA3NDc1IiwidXNlcklkIjoiNDE4NzA0IiwidHlwZUlkIjoiMmY5ODY0YjgtMDBmNS00NTNhLTlkNDYtMGViNTFmMWFjZjM4IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjU3MTMwMDcsImV4cCI6NDg4MTQ3MzAwN30.Mn7vpVHZclWCLpbXZAs4i4XdyuDV8Kw2BYa-SYGHaxA"
    }    
});
let x = await ethereumMoralis.json();

console.log(x);