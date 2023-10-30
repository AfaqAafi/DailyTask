import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import Index from "./pages";
import LoginForm from "./auth/LoginForm";
import RegistrationForm from "./auth/RegistrationForm";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";

const App = () => {
   const { isLoggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Index /> : <Navigate to="/login" replace />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};

export default App;
