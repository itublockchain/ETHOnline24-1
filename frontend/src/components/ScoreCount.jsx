import { useState, useEffect } from 'react';

const ScoreCount = ({ walletData }) => {
  const [generalScore, setGeneralScore] = useState(0);

  useEffect(() => {
    if (walletData && walletData.tx !== undefined) {
      
      const calculateGeneralScore = () => {
        const totalScore =
          (walletData.score || 0) +
          (walletData.transactions / 10 || 0) +
          (walletData.usdBalance / 5 || 0) +
          (walletData.ethBalance / 2 || 0) +
          (walletData.erc20Count / 150 || 0);
          (walletData.nftCount / 150 || 0);
        setGeneralScore(Math.floor(totalScore));
      };

      calculateGeneralScore();
    }
  }, [walletData]);

  return (
    <div className="text-5xl font-bold text-white transition-transform duration-500 ease-in-out transform hover:scale-105">
      {generalScore}
    </div>
  );
};

export default ScoreCount;
