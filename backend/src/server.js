import { executeInLit } from "./lit-protocol.js";
// import { attest } from "./sign";

import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

app.post("/get-analytics", async (req, res) => {
  const userAddress = req.body.userAddress;
  console.log(`Analytics of ${userAddress} is calculating..`);

  // const userAnalytics = await executeInLit(userAddress);

  // attest(res.score); <- userAddress as input

  

  // res.send(userAnalytics);
  res.json({
    total: {
      score: 20,
      transactions: 232,
      usdBalance: 40.17177429619103,
      ethBalance: 0.011044119746717967,
      erc20Count: 28,
      nftCount: 203,
    },
    mainnet: {
      score: 52,
      transactions: 58,
      usdBalance: 20.964502101660102,
      ethBalance: 0.00917930983950915,
      erc20Count: 2,
      nftCount: 11,
    },
    arbitrum: {
      score: 31,
      transactions: 111,
      usdBalance: 2.623963977028003,
      ethBalance: 0.000766507569032155,
      erc20Count: 17,
      nftCount: 100,
    },
    optimism: {
      score: 15,
      transactions: 63,
      usdBalance: 16.58330821750293,
      ethBalance: 0.001098302338176663,
      erc20Count: 9,
      nftCount: 92,
    },
  });
});