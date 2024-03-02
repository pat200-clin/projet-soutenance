import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const Player = () => {
  const [player, setPlayer] = useState([]);
  const [poste, setPoste] = useState([]);

  const getPosteNameById = (postId) => {
    const posteItem = poste.find((p) => p.id_poste === postId);
    return posteItem ? posteItem.nom : "";
  };
  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/player`)
      .then((result) => {
        if (result.data.Status) {
          setPlayer(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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

  const Delete = (id_joueur) => {
    axios.delete("http://localhost:3000/auth/delete_player/" + id_joueur)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      })
      
  };
  return (
    <div className="my-[2rem] mr-[4rem]">
      <div className="flex items-center justify-center">
        <h2 className="mb-[4rem] mr-[4rem] rounded-2xl shadow-xl bg-blue-500 text-white p-[2rem]">
          Listes des Joueurs
        </h2>
      </div>
      <Link
        to="/dashboard/ajouter_joueur"
        className="p-[0.8rem] m-[6rem] mb[2rem] duration-300 ease-out rounded-2xl text-white  hover:bg-blue-600  bg-green-500"
      >
        Ajouter un Joueur
      </Link>
      <table className="p-4 table m-7 w-[80%] h-[80%] text-center">
        <thead className="bg-blue-300 ">
          <tr className="p-4 space-x-2 font-bold ">
            <th className="border-black border-y-2">Nom</th>
            <th className="border-black border-y-2">Image</th>
            <th className="border-black border-y-2">Email</th>
            <th className="border-black border-y-2">Dorsard</th>
            <th className="border-black border-y-2">Montant</th>
            <th className="border-black border-y-2">Poste</th>
            <th className="border-black border-y-2">Action</th>
          </tr>
        </thead>
        {player.map((p) => (
          <tr className="">
            <td className="border-black border-y-2">{p.nom}</td>
            <td className="flex items-center justify-center border-black border-y-[0.09px]">
              <img
                src={`http://localhost:3000/Image/` + p.image}
                className="object-cover object-center h-[3rem] rounded-full w-[3rem]"
              />
            </td>
            <td className="border-black border-y-2">{p.email}</td>
            <td className="border-black border-y-2">{p.dorsard}</td>
            <td className="border-black border-y-2">{p.versement}</td>
            <td className="border-black border-y-2" > {getPosteNameById(p.poste_id)}</td>
            <td className="space-x-2 border-black border-y-2">
             <div className="flex items-center justify-center">
             <Link
                to={`/dashboard/modifier_joueur/` + p.id_joueur}
              >
               <FaEdit className="mr-3 text-xl text-blue-400"/>
              </Link>
              <AiFillDelete
              className="text-red-600 text-2xl cursor-pointer"
              onClick={() => {
                  Delete(p.id_joueur);
                }} />
             </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Player;
