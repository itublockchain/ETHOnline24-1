import { ConnectKitButton } from "connectkit";

const Disconnected = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Wallet Disconnected</h1>
      <p className="text-gray-400 mb-8">
        Your wallet has been disconnected. Please reconnect to continue.
      </p>
      <ConnectKitButton.Custom>
        {({ show }) => (
          <button
            onClick={show}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          >
            Reconnect Wallet
          </button>
        )}
      </ConnectKitButton.Custom>
    </div>
  );
};

export default Disconnected;
