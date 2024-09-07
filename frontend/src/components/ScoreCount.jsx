import { useState, useEffect } from 'react';

const ScoreCount = ({ walletData }) => {
  const [generalScore, setGeneralScore] = useState(0);

  useEffect(() => {
    if (walletData && walletData.tx !== undefined) {
      
      const calculateGeneralScore = () => {
        const totalScore =
          (walletData.tx || 0) +
          (walletData.balance / 10 || 0) +
          (walletData.erc20_721 / 5 || 0) +
          (walletData.uniqueContract / 2 || 0) +
          (walletData.tokenNumber / 150 || 0);
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
