import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import ConnectedWallet from "./pages/ConnectedWallet";
import Web3Provider from "./components/Web3Provider";
import ScrollScore from "./pages/ScrollScore";
function App() {
  return (
    <Web3Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />
            <Route path="connected-wallet" element={<ConnectedWallet />} />
            <Route path="scroll-score" element={<ScrollScore />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Web3Provider>
  );
}
export default App;
