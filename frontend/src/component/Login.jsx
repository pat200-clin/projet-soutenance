import React, { useEffect, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import three from "../assets/chaos-soccer-gear-Cjfl8r_eYxY-unsplash.jpg"


const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [error, setError] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setError(true), 5000); // Durée de 5 secondes

    return () => clearTimeout(timeout);
  }, []);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3000/auth/adminLogin`, values)
      .then((result) => {
        if (result.data.loginStatus) {
          navigate("/dashboard");
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-l from-sky-400 via-violet-600 to-indigo-500">
      <div className="relative rounded-xl  bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-500 w-[70vw] h-[70vh]">
        <div className="left-0 pt-5 pl-5 text-red-600">{error && error}</div>
        <div className="absolute top-0 left-0 flex items-center justify-center w-[50%] h-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full min-w-full p-100"
          >
            <h2 className="mb-3 text-3xl text-white">Login</h2>
            <div className="w-full h-[50px] bg-gray-300 border overflow-hidden border-blue-400 flex items-center px-2 rounded-full">
              <FaUser className="flex-1 text-lg text-center text-black" />
              <input
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                type="email"
                placeholder="Entrez votre email..."
                name="email"
                className="w-[70vw] text-lg font-semibold text-violet-600 border-none outline-none flex-4 bg-inherit "
              />
            </div>
            <div className="w-full h-[50px] bg-gray-300 border overflow-hidden border-blue-400 flex px-2 items-center m-001 rounded-full">
              <FaLock className="flex-1 text-lg text-center text-black" />
              <input
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                type="password"
                placeholder="Entrez votre mot de passe"
                name="password"
                className="w-[80vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit placeholder:text-gray-400 "
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 font-medium text-white uppercase duration-100 bg-red-500 rounded-lg m-001 hover:scale-200 hover:text-2xl hover:bg-emerald-500 "
              value={Login}
            >
              Valider
            </button>
          </form>
        </div>
        <div className="absolute top-0 right-0 flex items-center justify-center w-[50%] h-full">
          <img src={three} alt="" className="object-cover object-center w-full h-full rounded-lg " />
          
        </div>
      </div>
    </div>
  );
};

export default Login;
