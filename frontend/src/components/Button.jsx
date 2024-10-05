const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-transparent border border-gray-500 text-white px-6 py-3 rounded-lg 
      hover:bg-gray-800 hover:border-transparent hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-600 
      transition-all duration-300 ease-in-out ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
