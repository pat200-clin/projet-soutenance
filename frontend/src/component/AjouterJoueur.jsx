import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AjouterJoueur = () => {
  const [player, setPlayer] = useState({
    nom: "",
    email: "",
    password: "",
    poste: "",
    dorsard: "",
    versement: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom", player.nom);
    formData.append("email", player.email);
    formData.append("password", player.password);
    formData.append("poste", player.poste);
    formData.append("dorsard", player.dorsard);
    formData.append("versement", player.versement);
    formData.append("images", player.image);

    axios
      .post("http://localhost:3000/auth/ajouter_joueur", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/player");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const [poste, setPoste] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="flex items-center justify-center h-[80vh] w-[80vw]">
      <div className="relative rounded-xl mt-[4rem] w-[55vw] h-[75vh] bg-cyan-100 ">
        <div className="absolute top-0 flex items-center justify-center w-full h-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full min-w-full p-100"
          >
            <h2 className="text-3xl mb-[2rem] mt-[2rem] text-indigo-500">
              Ajouter Un Joueur
            </h2>
            <div className="w-full h-[30px]  bg-gray-300 border mb-[1rem]  border-blue-400 flex items-center px-2 rounded-full">
              <input
                onChange={(e) => setPlayer({ ...player, nom: e.target.value })}
                type="text"
                placeholder="Entrez le nom complet"
                name="nom"
                className="w-[70vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>
            <div className="w-full h-[30px]  bg-gray-300 border mb-[1rem]  border-blue-400 flex items-center px-2 rounded-full">
              <input
                onChange={(e) =>
                  setPlayer({ ...player, email: e.target.value })
                }
                type="email"
                placeholder="Entrez l'adresse email"
                name="email"
                className="w-[70vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>
            <div className="w-full h-[30px] bg-gray-300 border mb-[1rem]  border-blue-400 flex items-center px-2 rounded-full">
              <input
                onChange={(e) =>
                  setPlayer({ ...player, password: e.target.value })
                }
                type="password"
                placeholder="Entrez le mot de passe"
                name="password"
                className="w-[70vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>
            <div className="w-full mb-[1rem] h-[30px] bg-gray-300 border overflow-hidden border-blue-400 flex items-center px-2 rounded-full">
              <select
                onChange={(e) =>
                  setPlayer({ ...player, poste: e.target.value })
                }
                name="poste"
                id="poste"
                className="text-blue-600 bg-gray-300"
              >
                {poste.map((p) => {
                  return (
                    <option
                      className="border-none outline-none"
                      value={p.id_poste}
                    >
                      {p.nom}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full h-[30px]  bg-gray-300 border mb-[1rem]  border-blue-400 flex items-center px-2 rounded-full">
              <input
                onChange={(e) =>
                  setPlayer({ ...player, dorsard: e.target.value })
                }
                type="text"
                placeholder="Entrez le numero du Dorsard"
                name="dorsard"
                className="w-[70vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>

            <div className="w-full justify-center mb-[1rem] h-[30px] bg-gray-300 border overflow-hidden border-blue-400 flex items-center px-2 rounded-full">
              <input
                onChange={(e) =>
                  setPlayer({ ...player, versement: e.target.value })
                }
                autoComplete="off"
                id="inputVersement"
                type="text"
                placeholder="Entrez le montant du versement"
                name="versement"
                className="w-[70vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>

            <div className="w-full mb-[3rem] h-[30px] bg-gray-300 border overflow-hidden border-blue-400 flex items-center px-2 rounded-full">
              <input
                onChange={(e) =>
                  setPlayer({ ...player, image: e.target.files[0] })
                }
                type="file"
                name="images"
                className="w-[70vw] border-separate border-2 border-x-black text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>
            <button
              type="submit"
              className="w-[250px] py-2 border-none mb-[2rem] rounded-lg bg-blue-500 text-white font-medium m-001 uppercase hover:bg-blue-900"
            >
              Ajouter Joueur
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjouterJoueur;
