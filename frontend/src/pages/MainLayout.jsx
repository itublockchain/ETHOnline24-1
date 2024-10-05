import { Outlet } from "react-router-dom";

// Components
import { Navbar, Footer } from "../components";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
