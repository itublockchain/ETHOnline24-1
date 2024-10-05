import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./pages/MainLayout";

// Pages
import { Homepage, ConnectedWallet, ScrollScore, NotFoundPage } from "./pages";

// Components
import Web3Provider from "./components/Web3Provider";

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
