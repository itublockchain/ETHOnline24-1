import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import LayerTwo from "../components/LayerTwo";
import ScoreCount from "../components/ScoreCount";
import CheckYourScore from "../components/CheckYourScore";
import zkLogo from "../assets/zk-logo.png";
import optimismLogo from "../assets/optimism-logo.png";
import scrollLogo from "../assets/scroll-logo.png";
import mainnetLogo from "../assets/mainnet-logo.png";
import arbitrumLogo from "../assets/arbitrum-logo.png";
import leftVector from "../assets/left-vector.png";
import rightVector from "../assets/right-vector.png";

const networks = [
  {
    name: "zkSync",
    logo: zkLogo,
    transactions: ["zkTx 0001", "zkTx 0002", "zkTx 0003", "zKTx 0004"],
  },
  {
    name: "Optimism",
    logo: optimismLogo,
    transactions: ["OpTx 0001", "OpTx 0002"],
  },
  {
    name: "Scroll",
    logo: scrollLogo,
    transactions: ["ScTx 0001", "ScTx 0002"],
  },
  {
    name: "Mainnet",
    logo: mainnetLogo,
    transactions: ["LnTx 0001", "LnTx 0002"],
  },
  {
    name: "Arbitrum",
    logo: arbitrumLogo,
    transactions: ["ArTx 0001", "ArTx 0002"],
  },
];

const ConnectedWallet = () => {
  const { isConnected, address } = useAccount();
  const navigate = useNavigate();

  // walletData state
  const [walletData, setWalletData] = useState({
    tx: 0,
    balance: 0,
    erc20_721: 0,
    uniqueContract: 0,
    tokenNumber: 0,
  });

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  const handleLayerClick = (layer) => {
    navigate("/scroll-score", { state: { layer } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-black via-[#19122e] to-black text-white pt-12">


      <header className="w-full max-w-7xl px-5 mx-auto">
        <div className="flex flex-col items-center p-4 rounded-lg shadow-md">
          <p className="text-sm font-semibold text-gray-400">Account 1</p>
          <p className="text-lg font-bold text-white bg-gray-700 py-2 px-4 rounded-lg mt-2">
            {address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : "Not connected"}
          </p>
        </div>
      </header>

      <div className="text-center text-6xl my-6 flex items-center justify-center gap-6 mb-12">
        <img src={leftVector} alt="Left vector" className="animate-pulse" />
        <ScoreCount walletData={walletData} />
        <img src={rightVector} alt="Right vector" className="animate-pulse" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
        {networks.map((network) => (
          <LayerTwo
            key={network.name}
            logo={network.logo}
            name={network.name}
            onClick={() => handleLayerClick(network)}
          />
        ))}
      </div>

      <CheckYourScore walletData={walletData} setWalletData={setWalletData} />
    </div>
  );
};

export default ConnectedWallet;
