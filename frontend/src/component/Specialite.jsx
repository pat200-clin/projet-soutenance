import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Specialite = () => {
  const [specialite, setSpecialite] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/specialite`)
      .then(result => {
        if(result.data.Status){
          setSpecialite(result.data.Result)
        }else{
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="my-[3rem] mr-[6rem]">
      <div className="flex items-center justify-center">
        <h2 className="mb-[4rem] mr-[6rem] rounded-lg shadow-xl bg-blue-500 text-white p-[2rem]">
          Listes des differentes specialite
        </h2>
      </div>
      <Link
        to="/dashboard/ajouter_specialite"
        className="p-[0.8rem] m-[6rem] mb[2rem] duration-300 ease-out rounded-2xl text-white  hover:bg-blue-600  bg-green-500"
      >
        Ajouter Specialite
      </Link>
      <div className="m-[3rem]">
        <table className="p-4 table m-7 w-[80%] h-[80%] text-center">
          <thead className="bg-blue-300">
            <tr className="p-4 space-x-2 font-bold ">
              <th className="border-y-2 border-black">Specialite</th>
            </tr>
          </thead>
          <tbody className="text-center bg-cyan-50">
            {
              specialite.map(s =>(
                <tr className="w-full border-full">
                  <td className="border-y-2 border-black ">{s.nom}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Specialite