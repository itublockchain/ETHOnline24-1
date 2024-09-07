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

    res.send({
        totalScore : 100,
        mainnet : {
            score : 36,
            txCount : 22,
            dollarBalance : 263548,
            totalNFT : 2,
            totalERC20 : 6, 
        },
        arbitrum : {
            score : 23,
            txCount : 22,
            dollarBalance : 263548,
            totalNFT : 2,
            totalERC20 : 6, 
        },
        zksync : {
            score : 12,
            txCount : 12,
            dollarBalance : 26,
            totalNFT : 1,
            totalERC20 : 2, 
        },
        scroll : {
            score : 30,
            txCount : 23,
            dollarBalance : 248,
            totalNFT : 25,
            totalERC20 : 6, 
        },
        optimism : {
            score : 92,
            txCount : 221,
            dollarBalance : 2650,
            totalNFT : 8,
            totalERC20 : 13, 
        }
    });
    
});