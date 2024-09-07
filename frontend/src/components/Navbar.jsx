import { useState, useEffect } from "react";
import { ConnectKitButton } from "connectkit";
import logo from "../assets/persona-logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="p-8">
      <div
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black bg-opacity-80 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="bg-transparent border-b border-gray-800 shadow-lg">
          <div className="mx-auto max-w-7xl p-2 sm:p-6 lg:p-2 flex justify-between items-center">
            <div className="flex items-center gap-4 cursor-pointer hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105">
              <img
                src={logo}
                alt="logo"
                className="w-12 transition-transform duration-300 ease-in-out transform hover:rotate-12"
              />
              <p className="text-white font-semibold text-xl hover:scale-110 transition-all duration-300 ease-in-out">
                Persona
              </p>
            </div>
            <ConnectKitButton />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
