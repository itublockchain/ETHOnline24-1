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
      {({ show, truncatedAddress }) => {
        return (
          <button
            onClick={show}
            className="bg-transparent border border-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
          >
            {isConnected ? `Connected: ${truncatedAddress}` : "Check Your Score"}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default CustomConnectKitButton;
