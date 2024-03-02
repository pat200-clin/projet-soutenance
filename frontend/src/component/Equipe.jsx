import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Equipe = () => {
  const [equipe, setEquipe] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/equipe`)
      .then((result) => {
        if (result.data.Status) {
          setEquipe(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id_equipe) => {
    axios
      .delete("http://localhost:3000/auth/delete_equipe/" + id_equipe)
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
          Listes des differents equipes
        </h2>
      </div>
      <Link
        to="/dashboard/ajouter_equipe"
        className="p-[0.8rem] m-[6rem] mb[2rem]  duration-300 ease-out rounded-2xl text-white  hover:bg-blue-600  bg-green-500"
      >
        Ajouter Equipe
      </Link>
      <div className="m-[3rem]">
        <table className="p-4 table m-7 w-[80%] h-[80%] text-center ">
          <thead className="m-auto bg-blue-300">
            <tr className="m-auto space-x-4 font-bold ">
              <th className="border-black border-y-2">Nom</th>
              <th className="border-black border-y-2">Image</th>
              <th className="border-black border-y-2">Action</th>
            </tr>
          </thead>
          <tbody className="w-full font-bold text-center">
            {equipe.map((e) => (
              <tr className="mx-2 border-black border-y-2">
                <td className="border-black border-y-2 ">{e.nom}</td>
                <td className="flex items-center justify-center border-black border-[0.6px]">
                  <img
                    src={`http://localhost:3000/Image/` + e.image}
                    className="object-cover object-center h-[3rem] rounded-full w-[3rem]"
                    alt=""
                  />
                </td>
                <td className="border-black border-y-2 ">
                  <Link
                    className="px-2 duration-300 bg-green-300 hover:text-white font-bold hover:bg-green-500 hover:scale-[1.05] rounded-md mx-2 "
                    to={`/dashboard/modifier_equipe/` + e.id_equipe}
                  >
                    modifier
                  </Link>
                  <button
                    onClick={() => {
                      handleDelete(e.id_equipe);
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

export default Equipe;
