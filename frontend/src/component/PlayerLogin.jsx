import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlayerLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:3000/player/player_login`, values)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-slate-400 to-violet-500">
      <div className="relative rounded-xl w-[90vw] md:w-[60vw] md:h-[70vh] lg:w-[30vw] lg:h-[60vh] xl:h-[60vh] xl:w-[30vw] h-[70vh] bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-500 ">
        <div className="left-0 pt-5 pl-5 text-red-600">{error && error}</div>
        <div className="absolute top-0 flex items-center justify-center w-full h-full">
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
                className="w-[70vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
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
                className="w-[80vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>
            <button
              type="submit"
              className="w-[150px] py-2 border-none rounded-lg bg-red-500 text-white font-medium m-001 uppercase hover:w-[200px] hover:text-2xl hover:bg-blue-500"
            >
              Valider
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayerLogin;
