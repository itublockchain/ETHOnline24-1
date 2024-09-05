const Score = ({ label, transaction }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
      <span className="text-white font-semibold w-1/3">{label}</span>
      <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="bg-blue-500 absolute left-0 top-0 h-full transition-all duration-500 ease-in-out"
          style={{ width: `${Math.min(transaction, 100)}%` }}
        ></div>
      </div>
      <span className="text-white font-semibold ml-4">{transaction}</span>
    </div>
  );
};

export default Score;
