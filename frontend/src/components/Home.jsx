import homeVideo from '../assets/home-video.gif';
import CustomConnectKitButton from './CustomConnectKitButton';

const Home = () => {
  return (
    <div className="bg-black" id="home">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto p-6 gap-8">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold text-white">Persona</h1>
          <p className="text-gray-400 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <CustomConnectKitButton />
        </div>

        <div className="md:w-1/2">
          <img
            src={homeVideo}
            alt="Graphic"
            className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
