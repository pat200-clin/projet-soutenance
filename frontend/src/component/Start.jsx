import React from "react";
import { useNavigate } from "react-router-dom";
const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 via-slate-400 to-violet-500">
      <div className="relative bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-500 rounded-xl h-[46vh] w-[50vw]">
        <div className="mt-10">
          <h2 className="text-xl text-center text-white uppercase mt-14">
            bienvenue sur <span className="ml-2 text-black">Fresh</span>
            <span className="text-black">Sport</span>
          </h2>
        </div>
        <h2 className="mt-8 text-xl text-center text-white uppercase">
          ouvrir en tant que:
        </h2>
        <div className="flex items-center justify-around mt-6">
          <button
            onClick={() => {
              navigate("/adminLogin");
            }}
            className="px-6 py-2 font-medium text-white uppercase duration-100 ease-in border-none rounded-lg bg-red-500 hover:text-2xl hover:bg-blue-500 hover:scale-100"
          >
            Admin
          </button>
          <button
            onClick={() => {
              navigate("/personnel_login");
            }}
            className="py-2 font-medium text-white uppercase duration-100 ease-in border-none rounded-lg px-7 bg-red-500 m-001 hover:text-2xl hover:bg-blue-500 hover:scale-100"
          >
            Employe
          </button>
          <button
            onClick={() => {
              navigate("/player_login");
            }}
            className="px-6 py-2 font-medium text-white uppercase duration-100 ease-in border-none rounded-lg bg-red-500 m-001 hover:text-2xl hover:bg-blue-500 hover:scale-100"
          >
            Joueur
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
