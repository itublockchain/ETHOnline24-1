import { FaTwitter, FaTelegramPlane, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-gradient-to-t from-black to-blue-900 text-white py-12 flex flex-col items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 gap-12">
        <div className="space-y-4 md:w-1/2">
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="text-gray-400">2024 © Persona. All rights reserved.</p>
        </div>

        <div className="md:w-1/2 flex flex-col items-center">
          <div>
            <h3 className="font-bold text-lg mb-2">Social</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300 ease-in-out">
                <FaTwitter />
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Twitter
                </a>
              </li>
              <li className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300 ease-in-out">
                <FaTelegramPlane />
                <a
                  href="https://telegram.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Telegram
                </a>
              </li>
              <li className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300 ease-in-out">
                <FaDiscord />
                <a
                  href="https://discord.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">Stay in touch</h3>
          <div className="flex space-x-2 mt-2">
            <input
              type="email"
              placeholder="helloworld@xyz.co"
              className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300 ease-in-out">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
