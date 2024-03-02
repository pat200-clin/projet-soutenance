import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [employeTotal, setEmployeTotal] = useState(0);
  const [equipeTotal, setEquipeTotal] = useState(0);
  const [totalSalaire, setSalaireTotal] = useState(0);
  const [totalVersement, setVersementTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    adminCount();
    playerCount();
    equipeCount();
    employeCount();
    salaireCount();
    versementCount();
    adminList();
  }, []);

  const adminCount = () => {
    axios.get("http://localhost:3000/auth/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };
  const playerCount = () => {
    axios.get("http://localhost:3000/auth/player_count").then((result) => {
      if (result.data.Status) {
        setPlayerTotal(result.data.Result[0].player);
      }
    });
  };
  const equipeCount = () => {
    axios.get("http://localhost:3000/auth/equipe_count").then((result) => {
      if (result.data.Status) {
        setEquipeTotal(result.data.Result[0].equipe);
      }
    });
  };
  const employeCount = () => {
    axios.get("http://localhost:3000/auth/employe_count").then((result) => {
      if (result.data.Status) {
        setEmployeTotal(result.data.Result[0].personnel);
      }
    });
  };
  const salaireCount = () => {
    axios.get("http://localhost:3000/auth/salaire_count").then((result) => {
      if (result.data.Status) {
        setSalaireTotal(result.data.Result[0].salairePer);
      }
    });
  };
  const versementCount = () => {
    axios.get("http://localhost:3000/auth/versement_count").then((result) => {
      if (result.data.Status) {
        setVersementTotal(result.data.Result[0].versementPlay);
      }
    });
  };

  const adminList = () => {
    axios.get("http://localhost:3000/auth/admin_List").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else alert(result.data.Error);
    });
  };

  return (
    <div className=" overflow-y-auto w-[80%] h-[80%]">
      <div className="flex justify-around p-3 m-3 ">
        <div className="px-3 pt-2 pb-3 border bg-blue-100 shadow-sm  w-[20%] ">
          <div className="pb-2 text-center">
            <h4>Administrateurs</h4>
          </div>
          <hr />
          <div className="flex justify-between mt-4">
            <h5 className="ml-5">Total :</h5>
            <h5 className="ml-5">{adminTotal}</h5>
          </div>
        </div>
        <div className="px-1 pt-2 pb-3 border bg-stone-100 shadow-sm w-[20%]">
          <div className="pb-2 text-center">
            <h4>Joueurs</h4>
          </div>
          <hr />
          <div className="flex justify-between mt-4">
            <h5 className="ml-5">Total :</h5>
            <h5 className="ml-5">{playerTotal}</h5>
          </div>
        </div>
        <div className="px-1 pt-2 pb-3 border bg-amber-100 shadow-sm w-[20%]">
          <div className="pb-2 text-center">
            <h4>Employes</h4>
          </div>
          <hr />
          <div className="flex justify-between mt-4">
            <h5 className="ml-5">Total :</h5>
            <h5 className="ml-5">{employeTotal}</h5>
          </div>
        </div>
        <div className="px-1 pt-2 pb-3 border bg-lime-100 shadow-sm w-[20%]">
          <div className="pb-2 text-center">
            <h4>Equipes</h4>
          </div>
          <hr />
          <div className="flex justify-between mt-4">
            <h5 className="ml-5">Total :</h5>
            <h5 className="ml-5">{equipeTotal}</h5>
          </div>
        </div>
      </div>
      <div className="px-5 pt-3 mt-6 text-left ml-7">
        <div className="flex items-center justify-around">
        <div className="px-1 pt-2 pb-3 border bg-purple-100 shadow-sm w-[29%]">
          <div className="pb-2 text-center">
            <h4>Salaire</h4>
          </div>
          <hr />
          <div className="flex justify-between mt-4">
            <h5 className="ml-5">Total :</h5>
            <h5 className="ml-5">{totalSalaire} <span className="text-green-500">X</span><span className="text-red-500">A</span><span className="text-yellow-500">F</span></h5>
          </div>
        </div>
        <div className="px-1 pt-2 pb-3 border bg-purple-100 shadow-sm w-[29%]">
          <div className="pb-2 text-center">
            <h4>Versement</h4>
          </div>
          <hr />
          <div className="flex justify-between mt-4">
            <h5 className="ml-5">Total :</h5>
            <h5 className="ml-5">{totalVersement}<span className="text-green-500">X</span><span className="text-red-500">A</span><span className="text-yellow-500">F</span></h5>
          </div>
        </div>
        </div>
       <div className="mt-0 ">
       <div className="flex items-center justify-center ">
       <h3 className="ml-10 text-center bg-red-300 rounded-lg mt-[2rem] p-[1rem] shadow-sm">Liste des Administrateurs</h3>
       </div>
        <table className="p-4 table border-blue-500 m-7 w-[80vh] h-[8vh]  ">
          <thead className="">
            <tr className="p-6 m-4 font-bold ">
              <th className="">Email</th>
            </tr>
          </thead>
          <tbody className="text-center  h-[2.5rem]">
            {admins.map((a) => (
              <tr className="w-full text-left border-full">
                <td className="border-blue-100 border-y-2">
                  {a.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
      </div>
    </div>
  );
};

export default Home;
