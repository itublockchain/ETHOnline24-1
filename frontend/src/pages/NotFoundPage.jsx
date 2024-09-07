import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white p-12">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404 Error Not Found.</h1>
        <p className="text-2xl font-semibold mb-8">
          {`Oops! The page you're looking for doesn't exist.`}
        </p>

        <Link to="/">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
