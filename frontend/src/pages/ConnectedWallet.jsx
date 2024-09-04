import { useEffect } from "react"; 
import { useAccount } from "wagmi"; 
import { useNavigate } from "react-router-dom";
import optimismLogo from "../assets/optimism-logo.png";
import zkLogo from "../assets/zk-logo.png";
import scrollLogo from "../assets/scroll-logo.png";
import lineaLogo from "../assets/linea-logo.png";
import arbitrumLogo from "../assets/arbitrum-logo.png";
import leftVector from "../assets/left-vector.png";
import rightVector from "../assets/right-vector.png";
import LayerTwo from "../components/LayerTwo"; 

// Ağ verilerini tanımlıyoruz
const networks = [
  { name: "zkSync", logo: zkLogo, transactions: ["zkTx 0001", "zkTx 0002" , "zkTx 0003" , "zKTx 0004"] },
  { name: "Optimism", logo: optimismLogo, transactions: ["OpTx 0001", "OpTx 0002"] },
  { name: "Scroll", logo: scrollLogo, transactions: ["ScTx 0001", "ScTx 0002"] },
  { name: "Linea", logo: lineaLogo, transactions: ["LnTx 0001", "LnTx 0002"] },
  { name: "Arbitrum", logo: arbitrumLogo, transactions: ["ArTx 0001", "ArTx 0002"] }
];

const ConnectedWallet = () => {
  const { isConnected, address } = useAccount(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!isConnected) {
      console.log("Cüzdan bağlı değil, ana sayfaya yönlendiriliyor.");
      navigate("/");
    }
  }, [isConnected, navigate]); 

  const handleLayerClick = (layer) => {
    // Scroll Score sayfasına yönlendirme, seçilen ağı state olarak taşıyoruz
    navigate("/scroll-score", { state: { layer } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white pt-12">

      <header className="w-full max-w-7xl px-5 mx-auto">
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-gray-700 duration-300 cursor-pointer">
          <p className="text-sm font-semibold text-gray-400">Account 1</p>
          <p className="text-lg font-bold text-white bg-gray-700 py-2 px-4 rounded-lg mt-2 shadow-inner">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}
          </p>
        </div>
      </header>

      <div className="text-center text-6xl my-6 flex items-center justify-center gap-6 mb-12 animate-pulse cursor-pointer">
        <img src={leftVector} alt="" className="animate-bounce" />
        <p className="text-5xl">Layer 2</p>
        <img src={rightVector} alt="" className="animate-bounce" />
      </div>

      {/* Ağ Butonları */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
        {networks.map((network) => (
          <LayerTwo
            key={network.name}
            logo={network.logo}
            name={network.name}
            onClick={() => handleLayerClick(network)} // Tıklanan ağı seçiyoruz ve scroll-score sayfasına yönlendiriyoruz
          />
        ))}
      </div>
    </div>
  );
};

export default ConnectedWallet;
