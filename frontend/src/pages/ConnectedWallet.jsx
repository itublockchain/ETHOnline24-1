import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import LayerTwo from "../components/LayerTwo";
import CheckYourScore from "../components/CheckYourScore";
import optimismLogo from "../assets/optimism-logo.png";
import mainnetLogo from "../assets/mainnet-logo.png";
import arbitrumLogo from "../assets/arbitrum-logo.png";
import leftVector from "../assets/left-vector.png";
import rightVector from "../assets/right-vector.png";
import { useFetch } from "../hooks/useFetch";

const networks = [
  {
    name: "Optimism",
    logo: optimismLogo,
    transactions: ["OpTx 0001", "OpTx 0002"],
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
  const [dataWallet, setDataWallet] = useState();
  const { isConnected, address } = useAccount();
  const navigate = useNavigate();

  const { data } = useFetch(
    "/get-analytics",
    {
      userAddress: address,
    },
    "wallet",
    [!!address]
  );

  console.log(data);

  // walletData state

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  const handleLayerClick = (network) => {
    navigate("/scroll-score", {
      state: { data: dataWallet[network.name.toLowerCase()], layer: network },
    });
    console.log(network);
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
        <div className="text-5xl font-bold text-white transition-transform duration-500 ease-in-out transform hover:scale-105">
          {dataWallet?.total.score ? dataWallet?.total.score : 0}
        </div>
        <img src={rightVector} alt="Right vector" className="animate-pulse" />
      </div>

      <div className="flex flex-col justify-center items-center sm:flex-row gap-4 max-w-5xl mx-auto">
        {networks.map((network) => (
          <LayerTwo
            key={network.name}
            logo={network.logo}
            name={network.name}
            onClick={() => dataWallet &&  handleLayerClick(network)}
          />
        ))}
      </div>

      <CheckYourScore dataWallet={dataWallet} setDataWallet={setDataWallet} />
    </div>
  );
};

export default ConnectedWallet;
