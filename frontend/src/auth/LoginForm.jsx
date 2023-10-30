import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authcontext";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/users/auth", {
        email,
        password,
      });
      login(response.data);
      toast.success("Login successful");
      setEmail("");
      setPassword("");
      navigate("/");
      console.log(response.data);
    } catch (error) {
      toast.error("Login Failed");
      console.error("Login failed", error);
    }
  };

 
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <p className="text-base my-3">
            Do not have an account?{" "}
            <Link to="/register" className="text-sm underline text-blue-500">
              Register
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
