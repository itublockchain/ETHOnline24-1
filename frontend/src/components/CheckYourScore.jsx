const CheckYourScore = ({ walletData, setWalletData }) => {
  const calculateScore = () => {
    const simulatedData = {
      score: Math.floor(Math.random() * 100),
      transactions: Math.floor(Math.random() * 1000),
      usdBalance: Math.floor(Math.random() * 500),
      ethBalance: Math.floor(Math.random() * 200),
      erc20Count: Math.floor(Math.random() * 15000),
      nftCount: Math.floor(Math.random() * 15000),
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
          <span className="text-white  w-1/3">Transaction</span>
          <div className="bg-gray-700 w-full h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(walletData.transactions, 100)}%` }}
            ></div>
          </div>
          <span className="text-white  ml-4">{walletData.transactions}</span>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
          <span className="text-white  w-1/3">usdBalance</span>
          <div className="bg-gray-700 w-full h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(walletData.usdBalance / 10, 100)}%` }}
            ></div>
          </div>
          <span className="text-white  ml-4">{walletData.usdBalance}</span>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
          <span className="text-white  w-1/3">ethBalance</span>
          <div className="bg-gray-700 w-full h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(walletData.ethBalance / 5, 100)}%` }}
            ></div>
          </div>
          <span className="text-white  ml-4">{walletData.ethBalance}</span>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
          <span className="text-white  w-1/3">erc20Count</span>
          <div className="bg-gray-700 w-full h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(walletData.erc20Count / 2, 100)}%` }}
            ></div>
          </div>
          <span className="text-white  ml-4">{walletData.erc20Count}</span>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
          <span className="text-white  w-1/3">nftCount</span>
          <div className="bg-gray-700 w-full h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(walletData.nftCount / 150, 100)}%` }}
            ></div>
          </div>
          <span className="text-white  ml-4">{walletData.nftCount}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckYourScore;
