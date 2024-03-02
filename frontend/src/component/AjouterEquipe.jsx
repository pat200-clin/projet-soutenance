import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AjouterEquipe = () => {
  const [equipe, setEquipe] = useState({
    nom: "",
    image: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom", equipe.nom);
    formData.append("images", equipe.image);

    axios
      .post("http://localhost:3000/auth/ajouter_equipe", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/equipe");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center h-[80vh] w-[80vw]">
      <div className="relative rounded-xl mt-[4rem] w-[55vw] h-[45vh] bg-cyan-100 ">
        <div className="absolute top-0 flex items-center justify-center w-full h-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full min-w-full p-100"
          >
            <h2 className="text-3xl mb-[2rem] mt-[2rem] text-indigo-500">
              Ajouter Une Equipe
            </h2>
            <div className="w-full h-[40px]  bg-gray-300 border mb-[1rem]  border-blue-400 flex items-center px-2 rounded-full">
              <input
                onChange={(e) => setEquipe({ ...equipe, nom: e.target.value })}
                type="text"
                placeholder="Entrez une Equipe"
                name="nom"
                className="w-[70vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>
            <div className="w-full h-[40px]  bg-gray-300 border mb-[1rem]  border-blue-400 flex items-center px-2 rounded-full">
              <input
                 onChange={(e) =>setEquipe ({...equipe, image: e.target.files[0]})}
                type="file"
                name="images"
                className="w-[70vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>
            <button
              type="submit"
              className="w-[250px] py-2 border-none mt-[30px] mb-[20px] rounded-lg bg-blue-500 text-white font-medium m-001 uppercase hover:bg-blue-900"
            >
              Ajouter Equipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjouterEquipe;
