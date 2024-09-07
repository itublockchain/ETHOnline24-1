import { attest } from "../src/sign.js";

(async ()  => {
    attest(5,"0x419c65BD8D14575C1d8Af07734b4ff39599af84f").then((response) => console.log(response)).catch((error) => console.log(error));
})();