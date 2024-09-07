import { useNavigate } from "react-router-dom";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { useEffect } from "react";

const CustomConnectKitButton = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/connected-wallet");
    }
  }, [isConnected, navigate]);

  return (
    <ConnectKitButton.Custom>
      {({ show, truncatedAddress }) => (
        <button
          onClick={show}
          className="bg-transparent border border-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 ease-in-out"
        >
          {isConnected ? `Connected: ${truncatedAddress}` : "Check Your Score"}
        </button>
      )}
    </ConnectKitButton.Custom>
  );
};

export default CustomConnectKitButton;
