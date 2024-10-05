const LayerTwo = ({ logo, name, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition-transform transform hover:scale-105 duration-300 ease-in-out border-[#2563EB] border-dashed border-[3px] max-w-[219px] shadow-[0px_4px_4px_rgba(0,0,0,0.25) "
    >
      <img
        src={logo}
        alt={`${name} logo`}
        className="w-12 h-12 mx-auto rounded-full"
      />
      <p className="text-center mt-4 text-white font-semibold">{name}</p>
    </div>
  );
};

export default LayerTwo;
