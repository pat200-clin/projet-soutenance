import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Poste = () => {
  const [poste, setPoste] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/poste`)
      .then((result) => {
        if (result.data.Status) {
          setPoste(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id_poste) => {
    axios
      .delete("http://localhost:3000/auth/delete_poste/" + id_poste)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="my-[3rem] mr-[6rem]">
      <div className="flex items-center justify-center">
        <h2 className="mb-[4rem] mr-[6rem] rounded-lg shadow-xl bg-blue-500 text-white p-[2rem]">
          Listes des differents postes
        </h2>
      </div>
      <Link
        to="/dashboard/ajouter_poste"
        className="p-[0.8rem] m-[6rem] mb[2rem]  duration-300 ease-out rounded-2xl text-white  hover:bg-blue-600  bg-green-500"
      >
        Ajouter Poste
      </Link>
      <div className="m-[3rem]">
        <table className="p-4 table m-7 w-[80%] h-[80%] text-center ">
          <thead className="bg-blue-300">
            <tr className="p-6 space-x-6 font-bold ">
              <th className="border-black border-y-2">Poste</th>
              <th className="border-black border-y-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center bg-cyan-50">
            {poste.map((p) => (
              <tr className="w-full shadow-sm border-full">
                <td className="border-black border-y-2 ">{p.nom}</td>
                <td className="space-x-4 border-black border-y-2">
                  <button
                    onClick={() => {
                      handleDelete(p.id_poste);
                    }}
                    className="px-2 duration-300 bg-red-500 hover:text-white font-bold hover:bg-red-600 hover:scale-[1.05] rounded-md mx-2 "
                  >
                    supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Poste;
