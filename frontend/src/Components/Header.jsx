import { useContext } from "react";
import { AuthContext } from "../../context/authcontext";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  

  const handleLogout = async() => {
     try {
      const response = await axios.post("api/users/logout");
       logout();
       toast.success("User Logged Out successfully!");
      console.log(response.data); // Log the response data if necessary
    } catch (error) {
         toast.success("Error while logging out!");
      console.error("Error logging out", error);
    }
    
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Daily Workout</h1>
      {isLoggedIn ? (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </Link>
      )}
    </header>
  );
};

export default Header;
