import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Score from "../components/Score";
import ScoreCount from "../components/ScoreCount";
import leftVector from "../assets/left-vector.png";
import rightVector from "../assets/right-vector.png";

const ScrollScore = () => {
  const location = useLocation();
  const { layer } = location.state || {};
  const [walletData, setWalletData] = useState({
    tx: 0,
    balance: 0,
    erc20_721: 0,
    uniqueContract: 0,
    tokenNumber: 0,
  });

  useEffect(() => {
    const calculateScore = () => {
      const simulatedData = {
        tx: Math.floor(Math.random() * 100),
        balance: Math.floor(Math.random() * 100),
        erc20_721: Math.floor(Math.random() * 100),
        uniqueContract: Math.floor(Math.random() * 100),
        tokenNumber: Math.floor(Math.random() * 100),
      };
      setWalletData(simulatedData);
    };

    calculateScore();
  }, []);

  if (!layer) {
    return (
      <div className="text-center text-red-500">
        <h2>LAYER2 information not found. Please try again.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#19122e] to-black text-white pt-12">
      <div className="flex items-center justify-center mb-12">
        {layer.logo && (
          <img
            src={layer.logo}
            alt={layer.name}
            className="w-12 h-12 mr-4 animate-pulse"
          />
        )}
        <h1 className="text-center text-4xl font-bold">{layer.name}</h1>
      </div>

      {/* Genel Score */}
      <div className="text-center text-6xl my-6 flex items-center justify-center gap-6 mb-12">
        <img src={leftVector} alt="Left vector" className="animate-bounce" />
        <ScoreCount walletData={walletData} />
        <img src={rightVector} alt="Right vector" className="animate-bounce" />
      </div>

      {/* Score Components */}
      <div className="mt-12 max-w-5xl mx-auto space-y-4">
        <Score label="Tx" transaction={walletData.tx} />
        <Score label="Balance" transaction={walletData.balance} />
        <Score label="erc20/erc721" transaction={walletData.erc20_721} />
        <Score
          label="Unique Contract"
          transaction={walletData.uniqueContract}
        />
        <Score label="Token Number" transaction={walletData.tokenNumber} />
      </div>
    </div>
  );
};

export default ScrollScore;
