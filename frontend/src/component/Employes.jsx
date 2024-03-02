import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const Employes = () => {
  const [employes, setEmployes] = useState([]);
  const [specialite, setSpecialite] = useState([]);

  const getSpecialiteNameById = (specialiteId) => {
    const specialiteItem = specialite.find(
      (e) => e.id_specialite === specialiteId
    );
    return specialiteItem ? specialiteItem.nom : "";
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/employes`)
      .then((result) => {
        if (result.data.Status) {
          setEmployes(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  

  const handleDelete = (id_personnel) => {
    axios
      .delete("http://localhost:3000/auth/delete_employe/" + id_personnel)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/specialite`)
      .then((result) => {
        if (result.data.Status) {
          setSpecialite(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="my-[2rem] mr-[4rem]">
      <div className="flex items-center justify-center">
        <h2 className="mb-[3rem] mr-[3rem] rounded-2xl shadow-lg bg-blue-500 text-white p-[2rem]">
          Listes des Employes
        </h2>
      </div>
      <Link
        to="/dashboard/ajouter_employe"
        className="p-[0.8rem] m-[3rem] mb-[6rem] duration-300 ease-out rounded-2xl text-white  hover:bg-blue-600  bg-green-500"
      >
        Ajouter un Employe
      </Link>
      <table className="p-4 table m-7 w-[80%] h-[80%] text-center  ">
        <thead className="m-auto bg-blue-300">
          <tr className="p-4 m-auto space-x-4 font-bold">
            <th className="border-black border-y-2 ">Nom</th>
            <th className="border-black border-y-2">Image</th>
            <th className="border-black border-y-2">Email</th>
            <th className="border-black border-y-2">Specialite</th>
            <th className="w-[2rem] border-black border-y-2">Ville</th>
            <th className="border-black border-y-2">Salaire</th>
            <th className="border-black border-y-2">Action</th>
          </tr>
        </thead>
        {employes.map((e) => (
          <tr className="p-6 h-[9vh] m-auto">
            <td className="border-black border-y-2 ">{e.nom}</td>
            <td className="flex items-center justify-center border-black border-y-[0.6px]">
              <img
                src={`http://localhost:3000/Image/` + e.image}
                className="object-cover object-center h-[4rem] rounded-full w-[3rem]"
                alt=""
              />
            </td>
            <td className="border-black border-y-2">{e.email}</td>
            <td className="border-black border-y-2">{getSpecialiteNameById(e.specialite_id)}</td>
            <td className="border-black border-y-2">{e.ville}</td>
            <td className="border-black border-y-2">{e.salaire}</td>
            <td className="space-x-2 border-black border-y-2">
             <div className="flex items-center justify-center">
             <Link
                to={`/dashboard/modifier_employe/` + e.id_personnel}
              >
                <FaEdit className="mr-3 text-blue-400"/>
              </Link>
              <AiFillDelete className=" cursor-pointer text-red-500 text-xl" onClick={() => {
                  handleDelete(e.id_personnel);
                }}/>
             </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Employes;
