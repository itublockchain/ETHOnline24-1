import { useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";
import ConnectedView from './ConnectedView';
import Disconnected from "./Disconnected";

const WalletPage = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect triggered - isConnected:", isConnected);
    console.log("Address:", address);

    if (isConnected && address) {
      console.log("Navigating to /connected-wallet");
      navigate("/connected-wallet");
    }
  }, [isConnected, address, navigate]);

  useEffect(() => {
    console.log("useEffect triggered for disconnect - isConnected:", isConnected);
    if (!isConnected) {
      console.log("Navigating to / (disconnect event)");
      navigate("/");
    }
  }, [isConnected, navigate]);

  const handleDisconnect = () => {
    disconnect();
  };

  const manualNavigateHome = () => {
    console.log("Manually navigating to home");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      {!isConnected ? (
        <Disconnected />
      ) : (
        <>
          <ConnectedView />
          <button
            onClick={handleDisconnect}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600"
          >
            Disconnect Wallet
          </button>
          <button
            onClick={manualNavigateHome}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-green-600"
          >
            Go to Home (Manual)
          </button>
        </>
      )}
    </div>
  );
};

export default WalletPage;
