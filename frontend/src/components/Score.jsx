const Score = ({ label, transaction }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg flex justify-between items-center max-w-4xl w-full shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:bg-gray-800 cursor-pointer mx-auto gap-12">
      <span className="text-gray-300 font-semibold tracking-wider">
        {label}
      </span>
      <span className="text-white font-mono tracking-wide animate-pulse">
        {transaction}
      </span>
    </div>
  );
};

export default Score;
