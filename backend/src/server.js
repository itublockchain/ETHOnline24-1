import { executeInLit } from "./lit-protocol.js";
// import { attest } from "./sign";

import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

app.use( express.json() );
app.use( cors() );

app.listen(port, () => {console.log(`Server is running on port ${port}.`);});

app.post('/get-analytics', async (req, res) => {
    
    const userAddress = req.body.userAddress;
    console.log(`Analytics of ${userAddress} is calculating..`);

    const userAnalytics = await executeInLit(userAddress);

    // attest(res.score); <- userAddress as input

    res.send(userAnalytics);
    
});