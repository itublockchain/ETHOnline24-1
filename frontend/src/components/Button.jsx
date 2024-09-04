const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-transparent border border-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
