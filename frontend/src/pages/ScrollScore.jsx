import { useLocation } from "react-router-dom";

// Components
import { Score } from "../components";

// Images
import { leftVector, rightVector } from "../lib/images";

const ScrollScore = () => {
  const { state } = useLocation();
  const { data, layer } = state;

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
        {data?.score.toFixed(2)}
        <img src={rightVector} alt="Right vector" className="animate-bounce" />
      </div>

      {/* Score Components */}
      <div className="mt-12 max-w-5xl mx-auto space-y-4">
        <Score label="Score" transaction={data?.score.toFixed(2)} />
        <Score label="Transaction" transaction={data?.transactions} />
        <Score label="USD Balance" transaction={data?.usdBalance.toFixed(2)} />
        <Score label="ETH Balance" transaction={data?.ethBalance.toFixed(2)} />
        <Score label="ERC20 Count" transaction={data?.erc20Count} />
        <Score label="NFT Count" transaction={data?.nftCount} />
      </div>
    </div>
  );
};

export default ScrollScore;
