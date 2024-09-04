import { useAccount } from 'wagmi';

const ConnectedView = () => {
  const { address } = useAccount(); 

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-black to-blue-900 text-white pt-12">
      <header className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <img src="/assets/persona-logo.png" alt="Persona logo" className="w-12" />
          <p className="text-lg font-semibold">Persona</p>
        </div>
        <div className="text-right">
          <p>Account 1</p>
          {address ? (
            <p>{address.slice(0, 6)}...{address.slice(-4)}</p>
          ) : (
            <p>Not connected</p>
          )}
        </div>
      </header>

      <div className="text-center text-6xl my-6">
        <p className="text-5xl">100</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg">zkSync</div>
        <div className="bg-gray-800 p-6 rounded-lg">Optimism</div>
        <div className="bg-gray-800 p-6 rounded-lg">Scroll</div>
        <div className="bg-gray-800 p-6 rounded-lg">Linea</div>
        <div className="bg-gray-800 p-6 rounded-lg">Arbitrum</div>
      </div>

      <div className="mt-6 max-w-5xl mx-auto space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg flex justify-between">
          <span>Tx</span>
          <span>00000000000000000000</span>
        </div>
      </div>
    </div>
  );
};

export default ConnectedView;
