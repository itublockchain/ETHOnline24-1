import { ConnectKitButton } from "connectkit";

const Disconnected = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl mb-4">Wallet Disconnected</h1>
      <p className="text-gray-400 mb-6">Your wallet has been disconnected. Please reconnect to continue.</p>
      <ConnectKitButton /> 
    </div>
  );
};

export default Disconnected;
