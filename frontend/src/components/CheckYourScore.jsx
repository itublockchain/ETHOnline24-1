const CheckYourScore = ({ walletData, setWalletData }) => {
  const calculateScore = () => {
    const simulatedData = {
      tx: Math.floor(Math.random() * 100),
      balance: Math.floor(Math.random() * 1000),
      erc20_721: Math.floor(Math.random() * 500),
      uniqueContract: Math.floor(Math.random() * 200),
      tokenNumber: Math.floor(Math.random() * 15000),
    };
    setWalletData(simulatedData);
  };

  return (
    <div className="mt-6 flex flex-col items-center mb-12">
      <button
        onClick={calculateScore}
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out mb-6"
      >
        Check Your Score
      </button>

      <div className="flex flex-col gap-6 w-[300px] md:w-[450px] lg:w-[600px]">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
          <span className="text-white font-semibold w-1/3">Tx</span>
          <div className="bg-gray-700 w-full h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(walletData.tx, 100)}%` }}
            ></div>
          </div>
          <span className="text-white font-semibold ml-4">{walletData.tx}</span>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
          <span className="text-white font-semibold w-1/3">Balance</span>
          <div className="bg-gray-700 w-full h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(walletData.balance / 10, 100)}%` }}
            ></div>
          </div>
          <span className="text-white font-semibold ml-4">{walletData.balance}</span>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
          <span className="text-white font-semibold w-1/3">erc20/erc721</span>
          <div className="bg-gray-700 w-full h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(walletData.erc20_721 / 5, 100)}%` }}
            ></div>
          </div>
          <span className="text-white font-semibold ml-4">{walletData.erc20_721}</span>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
          <span className="text-white font-semibold w-1/3">Unique Contract</span>
          <div className="bg-gray-700 w-full h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(walletData.uniqueContract / 2, 100)}%` }}
            ></div>
          </div>
          <span className="text-white font-semibold ml-4">{walletData.uniqueContract}</span>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
          <span className="text-white font-semibold w-1/3">Token Number</span>
          <div className="bg-gray-700 w-full h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(walletData.tokenNumber / 150, 100)}%` }}
            ></div>
          </div>
          <span className="text-white font-semibold ml-4">{walletData.tokenNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckYourScore;
