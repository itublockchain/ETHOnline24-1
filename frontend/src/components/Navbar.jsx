import logo from "../assets/persona-logo.png";
import Button from "./Button";
const Navbar = () => {
  return (
    <>
      <div className="bg-black">
      <nav
        id="navbar-container"
        className="bg-transparent border-b border-gray-800 shadow-lg"
      >
        <div className="mx-auto max-w-7xl p-2 sm:p-6 lg:p-2 flex justify-between items-center">
          <div
            id="logo"
            className="flex items-center gap-4 cursor-pointer hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <img
              src={logo}
              alt="logo"
              className="w-12 transition-transform duration-300 ease-in-out transform hover:rotate-12"
            />
            <p className="text-white font-semibold transition-transform duration-300 ease-in-out transform hover:scale-110">
              Persona
            </p>
          </div>
          <Button />
        </div>
      </nav>
      </div>
    </>
  );
};

export default Navbar;
