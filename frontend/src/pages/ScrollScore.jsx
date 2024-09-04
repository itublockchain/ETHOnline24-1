import { useLocation } from "react-router-dom";
import Score from "../components/Score"; 

const ScrollScore = () => {
  const location = useLocation();
  const { layer } = location.state || {}; // Gelen layer verisini alıyoruz

  if (!layer) {
    return (
      <div className="text-center text-red-500">
        <h2>LAYER2 bilgisi bulunamadı. Lütfen tekrar deneyin.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white p-12">
      <h1 className="text-center text-4xl mb-12">{layer.name}</h1>

      {/* İşlemleri Score componenti ile gösteriyoruz */}
      <div className="mt-12 max-w-5xl mx-auto space-y-4">
        {layer.transactions.map((tx, index) => (
          <Score key={index} label="Tx" transaction={tx} />
        ))}
      </div>
    </div>
  );
};

export default ScrollScore;
