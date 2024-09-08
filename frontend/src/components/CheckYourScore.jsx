import { useAccount } from "wagmi";
import { useFetch } from "../hooks/useFetch";
import { useState , useEffect } from "react";
const CheckYourScore = ({ dataWallet , setDataWallet }) => {
 

  const { address } = useAccount();
  const [isFetch , setIsFetch] = useState(false);

  

  const { data  } = useFetch(
    "/get-analytics",
    {
      userAddress: address,
    },
    "wallet",
    [ !!address , isFetch]
    
  );
  useEffect(() => {

    if (isFetch === false) {
      return
    }
    setDataWallet(data)
   
  }, [isFetch])

  
  console.log(dataWallet , 'Çok yorucu!');

  return (
    <div className="mt-6 flex flex-col items-center mb-12">
      <button
        onClick={()=> setIsFetch(true)}
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
              style={{ width: `${Math.min(data?.total.transactions, 100)}%` }}
            ></div>
          </div>
          <span className="text-white  ml-4"> {dataWallet?.total.transactions } </span>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
          <span className="text-white  w-1/3">usdBalance</span>
          <div className="bg-gray-700 w-full h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(dataWallet?.usdBalance / 10, 100)}%` }}
            ></div>
          </div>
          <span className="text-white  ml-4"> {dataWallet?.total.usdBalance}</span>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
          <span className="text-white  w-1/3">ethBalance</span>
          <div className="bg-gray-700 w-full h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(dataWallet?.ethBalance / 5, 100)}%` }}
            ></div>
          </div>
          <span className="text-white  ml-4">{dataWallet?.total.ethBalance}</span>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
          <span className="text-white  w-1/3">erc20Count</span>
          <div className="bg-gray-700 w-full h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(dataWallet?.erc20Count / 2, 100)}%` }}
            ></div>
          </div>
          <span className="text-white  ml-4"> {dataWallet?.total.erc20Count} </span>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
          <span className="text-white  w-1/3">nftCount</span>
          <div className="bg-gray-700 w-full h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(dataWallet?.nftCount / 150, 100)}%` }}
            ></div>
          </div>
          <span className="text-white  ml-4">{dataWallet?.total.nftCount}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckYourScore;
