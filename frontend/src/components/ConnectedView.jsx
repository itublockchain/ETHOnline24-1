import { useAccount } from 'wagmi';

const ConnectedView = () => {
  const { address } = useAccount(); 

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-black to-blue-900 text-white pt-12">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <img src="/assets/persona-logo.png" alt="Persona logo" className="w-12" />
          <p className="text-lg font-semibold">Persona</p>
        </div>
        <div className="text-right">
          <p className="">Account 1</p>
          {address ? (
            <p className="text-xl font-bold">{address.slice(0, 6)}...{address.slice(-4)}</p>
          ) : (
            <p className="text-xl font-semibold">Not connected</p>
          )}
        </div>
      </header>

      {/* Score Display */}
      <div className="text-center text-6xl my-6">
        <p className="text-5xl font-bold">100</p>
      </div>

      {/* Layer 2 Technologies */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
        {["zkSync", "Optimism", "Scroll", "Mainnet", "Arbitrum"].map((tech, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            {tech}
          </div>
        ))}
      </div>

      {/* Transaction Information */}
      <div className="mt-6 max-w-5xl mx-auto space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg flex justify-between hover:bg-gray-700 transition-colors duration-300 ease-in-out">
          <span className="font-semibold">Tx</span>
          <span className="font-mono">00000000000000000000</span>
        </div>
      </div>
    </div>
  );
};

export default ConnectedView;
