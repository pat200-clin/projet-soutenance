import React from "react";
import { Link } from "react-router-dom";


const Rencontre = () => {
  return (
    <div className="my-[3rem] mr-[6rem]">
      <div className="flex items-center justify-center">
        <h2 className="mb-[4rem] mr-[6rem] rounded-lg shadow-xl bg-blue-500 text-white p-[2rem]">
         Differents matchs jouees
        </h2>
      </div>
      <Link
        to="/dashboard/ajouter_match"
        className="p-[0.8rem] m-[6rem] mb[2rem] duration-300 ease-out rounded-2xl text-white  hover:bg-blue-600  bg-green-500"
      >
        Ajouter une Rencontre
      </Link>
    </div>
  );
};

export default Rencontre;
