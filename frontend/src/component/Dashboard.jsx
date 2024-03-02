import React from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaFlag, FaTeamspeak, FaUserGraduate, FaXmark } from "react-icons/fa6";
import { GrUserAdmin, GrUser, GrAction, GrChapterAdd } from "react-icons/gr";
import { IoMdFootball, IoMdLogOut } from "react-icons/io";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        navigate("/adminLogin");
      }
    });
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden text-xl bg-blue-300">
      <div className="grid w-[100%] m-00 h-full  grid-cols-4 bg-blue-300">
        <aside className="h-full bg-blue-300">
          <div className="flex items-center justify-between mt-3 bg-blue-300">
            <div className="flex justify-center items-center ml-[3rem]">
              <Link to="/dashboard">
                <h1 className="text-2xl font-bold text-blue-700">
                  Fresh<span className="text-2xl text-red-700">Sport</span>
                </h1>
              </Link>
              <div className="hidden">
                <FaXmark />
              </div>
            </div>
          </div>

          <div className="bg-blue-300 h-[86vh] flex flex-col relative ">
            <Link
              to="/dashboard"
              className="relative  focus:ml-[1rem] hover:ml-[1rem] focus:rounded-lg hover:rounded-lg focus:bg-white hover:bg-white focus:text-black hover:text-black flex items-center gap-3 ml-8 h-[3rem] duration-300 ease-in text-black"
            >
              <MdDashboard className="text-2xl" />
              <h3 className="font-semibold text-md">Dashboard </h3>
            </Link>
            <Link
              to="/dashboard/player"
              className="relative  focus:ml-[1rem] hover:ml-[1rem] focus:rounded-lg hover:rounded-lg focus:bg-white hover:bg-white focus:text-black hover:text-black flex items-center gap-3 ml-8 h-[3rem] duration-300 ease-in text-black"
            >
              <GrUserAdmin className="text-2xl" />
              <h3 className="font-semibold text-md">Gestion Joueur</h3>
            </Link>
            <Link
              to="/dashboard/poste"
              className="relative  focus:ml-[1rem] hover:ml-[1rem] focus:rounded-lg hover:rounded-lg focus:bg-white hover:bg-white focus:text-black hover:text-black flex items-center gap-3 ml-8 h-[3rem] duration-300 ease-in text-black"
            >
              <GrAction className="text-2xl" />
              <h3 className="font-semibold text-md">Poste</h3>
            </Link>
            <Link
              to="/dashboard/stadium"
              className="relative  focus:ml-[1rem] hover:ml-[1rem] focus:rounded-lg hover:rounded-lg focus:bg-white hover:bg-white focus:text-black hover:text-black flex items-center gap-3 ml-8 h-[3rem] duration-300 ease-in text-black"
            >
              <IoMdFootball className="text-2xl" />
              <h3 className="font-semibold text-md">Stade</h3>
            </Link>
            <Link
              to="/dashboard/employes"
              className="relative  focus:ml-[1rem] hover:ml-[1rem] focus:rounded-lg hover:rounded-lg focus:bg-white hover:bg-white focus:text-black hover:text-black flex items-center gap-3 ml-8 h-[3rem] duration-300 ease-in text-black"
            >
              <FaUserGraduate className="text-2xl active:text-blue-500 " />
              <h3 className="font-semibold text-md">Gestion Personnel</h3>
            </Link>
            <Link
              to="/dashboard/specialite"
              className="relative  focus:ml-[1rem] hover:ml-[1rem] focus:rounded-lg hover:rounded-lg focus:bg-white hover:bg-white focus:text-black hover:text-black flex items-center gap-3 ml-8 h-[3rem] duration-300 ease-in text-black"
            >
              <GrChapterAdd className="text-2xl" />
              <h3 className="font-semibold text-md">Specialite</h3>
            </Link>

            <Link
              to="/dashboard/equipe"
              className="relative  focus:ml-[1rem] hover:ml-[1rem] focus:rounded-lg hover:rounded-lg focus:bg-white hover:bg-white focus:text-black hover:text-black flex items-center gap-3 ml-8 h-[3rem] duration-300 ease-in text-black"
            >
              <FaFlag className="text-2xl" />
              <h3 className="font-semibold text-md active:text-black ">
                Gestion Equipe
              </h3>
            </Link>
            <Link
              to="/dashboard/rencontre"
              className="relative  focus:ml-[1rem] hover:ml-[1rem] focus:rounded-lg hover:rounded-lg focus:bg-white hover:bg-white focus:text-black hover:text-black flex items-center gap-3 ml-8 h-[3rem] duration-300 ease-in text-black"
            >
              <FaTeamspeak className="text-2xl active:text-blue-500 " />
              <h3 className="font-semibold text-md">Rencontre</h3>
            </Link>

            <Link
              to="/dashboard/profil"
              className="relative  focus:ml-[1rem] hover:ml-[1rem] focus:rounded-lg hover:rounded-lg focus:bg-white hover:bg-white focus:text-black hover:text-black flex items-center gap-3 ml-8 h-[3rem] duration-300 ease-in text-black"
            >
              <GrUser className="text-2xl " />
              <h3 className="font-semibold text-md">Profil</h3>
            </Link>

            <div onClick={handleLogout}>
              <Link
                to="/dashboard"
                className="relative hover:ml-[1rem] ease-in hover:rounded-lg hover:bg-white hover:pr-[2rem] hover:text-blue-600 flex items-center gap-3 ml-8 h-[3.7rem] duration-300 text-black last:absolute last:bottom-[1.1rem]  "
              >
                <IoMdLogOut className="text-2xl text-red-600" />
                <h3 className="font-semibold text-md">Logout</h3>
              </Link>
            </div>
          </div>
        </aside>

        <main className="w-full h-full bg-white ">
          <div className="  w-screen h-[7vh] rounded-sm bg-sky-400 ">
            <div className="h-[80vh] w-[80vw]">
              <h1 className="text-3xl font-semibold text-center text-white ">
                FreshSport
              </h1>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
