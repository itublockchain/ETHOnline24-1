import { attest } from "../src/sign.js";

(async ()  => {
    attest(5).then((response) => console.log(response)).catch((error) => console.log(error));
})();