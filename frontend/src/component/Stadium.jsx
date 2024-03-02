import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Stadium = () => {
  const [stade, setStade] = useState([]);
  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/stadium`)
      .then((result) => {
        if (result.data.Status) {
          setStade(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="my-[3rem] mr-[6rem]">
    <div className="flex items-center justify-center">
      <h2 className="mb-[4rem] mr-[6rem] rounded-lg shadow-xl bg-blue-500 text-white p-[2rem]">
        Listes des differents Stades
      </h2>
    </div>
    <Link
      to="/dashboard/ajouter_stade"
      className="p-[0.8rem] m-[6rem] mb[2rem]  duration-300 ease-out rounded-2xl text-white  hover:bg-blue-600  bg-green-500"
    >
      Ajouter Stade
    </Link>
   
    <div className="m-[3rem]">
        <table className="p-4 table m-7 w-[80%] h-[80%] text-center ">
          <thead className="bg-blue-300">
            <tr className="p-6 space-x-6 font-bold ">
              <th className="border-black border-y-2">Stade</th>
            </tr>
          </thead>
          <tbody className="text-center bg-cyan-50">
            {stade.map((s) => (
              <tr className="w-full shadow-sm border-full">
                <td className="border-black border-y-2 ">{s.nom}</td>
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Stadium
