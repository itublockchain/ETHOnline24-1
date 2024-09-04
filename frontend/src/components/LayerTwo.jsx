const LayerTwo = ({ logo, name, isSelected, onClick }) => {
  return (
    <div
      className={`bg-gray-800 p-6 rounded-lg flex justify-center items-center transition-all transform hover:scale-105 hover:bg-gray-700 duration-300 shadow-lg hover:shadow-2xl cursor-pointer ${isSelected ? 'border-2 border-blue-500' : ''}`}
      onClick={onClick}
    >
      <img src={logo} alt={name} className="w-12 h-12" />
      <span className="ml-4">{name}</span>
    </div>
  );
};

export default LayerTwo;
