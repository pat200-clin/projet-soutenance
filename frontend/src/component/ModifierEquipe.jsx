import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ModifierEquipe = () => {
  const { id_equipe } = useParams();
  
  const [equipe, setEquipe] = useState({
    nom: "",
  });

const navigate = useNavigate()
  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/equipe/` + id_equipe)
      .then((result) => {
        setEquipe({
          ...equipe,
          nom: result.data.Result[0].nom,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/auth/modifier_equipe/` + id_equipe, equipe)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/equipe");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-center h-[80vh] w-[80vw]">
      <div className="relative rounded-xl mt-[4rem] w-[40vw] h-[50vh] bg-cyan-100 ">
        <div className="absolute top-0 flex items-center justify-center w-full h-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full min-w-full p-100"
          >
            <h2 className="text-3xl mb-[2rem] mt-[2rem] text-indigo-500">
              Modifier Une Equipe
            </h2>
            <div className="w-full h-[40px]  bg-gray-300 border mb-[1rem]  border-blue-400 flex items-center px-2 rounded-full">
              <input
                onChange={(e) => setEquipe({ ...equipe, nom: e.target.value })}
                type="text"
                placeholder="Entrez une Equipe"
                name="nom"
                value={equipe.nom}
                className="w-[70vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>

            <button
              type="submit"
              className="w-[250px] py-2 border-none mt-[30px] mb-[20px] rounded-lg bg-blue-500 text-white font-medium m-001 uppercase hover:bg-blue-900"
            >
              Modifier Equipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifierEquipe;
