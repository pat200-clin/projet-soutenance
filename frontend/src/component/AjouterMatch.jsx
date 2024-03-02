import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AjouterMatch = () => {
  const [match, setMatch] = useState({
    dates: "",
    heure: "",
    categorie: "",
    equipe1_id: "",
    equipe2_id: "",
    stade_id: "",
    
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/auth/ajouter_match", match)
      .then((result) => {
        if (result.data.Status) {
          navigate("/match");
        } else {
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const [equipe, setEquipe] = useState([]);

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
    <div className="flex items-center justify-center h-[80vh] w-[80vw]">
      <div className="relative rounded-xl mt-[4rem] w-[45vw] h-[85vh] bg-cyan-100 ">
        <div className="absolute flex items-center justify-center w-full h-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full min-w-full p-100"
          >
            <div className="flex items-center justify-center">
              <h2 className="text-3xl  mt-[2rem] text-indigo-500">
                Programmer une rencontre
              </h2>
            </div>
            <label htmlFor="date_match" className="mb-1 ml-6">
              Date du match
            </label>
            <div className="w-full h-[30px]  bg-gray-300 border mb-[1rem]  border-blue-400 flex items-center px-2 rounded-full">
              <input
                onChange={(e) => setMatch({ ...match, dates: e.target.value })}
                type="date"
                name="dates"
                id="date_match"
                className="w-[70vw] text-lg font-semibold  text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>
            <label htmlFor="heure_match" className="mb-1 ml-6">
              Heure de match
            </label>
            <div className="w-full h-[30px]  bg-gray-300 border mb-[1rem]  border-blue-400 flex items-center px-2 rounded-full">
              <input
                onChange={(e) => setMatch({ ...match, heure: e.target.value })}
                type="time"
                id="heure_match"
                name="heure"
                className="w-[70vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>
            <label htmlFor="categorie" className="mb-1 ml-6">
                Categorie des joueurs
              </label>
              <div className="w-full h-[30px]  bg-gray-300 border mb-[1rem]  border-blue-400 flex items-center px-2 rounded-full">
                <input
                  onChange={(e) =>
                    setMatch({ ...match, categorie: e.target.value })
                  }
                  type="text"
                  name="categorie"
                  id="categorie"
                  className="w-[70vw] uppercase text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
                />
              </div>
            <label className="mb-1 ml-3" htmlFor="equipe1_id">
              Equipe 1
            </label>
            <div className="w-full mb-[1rem] h-[30px] bg-gray-300 border overflow-hidden border-blue-400 flex items-center px-2 rounded-full">
              <select
                onChange={(e) =>
                  setMatch({ ...match, equipe1_id: e.target.value })
                }
                name="equipe1"
                id="equipe1_id"
                className="text-blue-600 bg-gray-300"
              >
                {equipe.map((p) => {
                  return (
                    <option
                      className="border-none outline-none"
                      value={p.id_equipe}
                    >
                      {p.nom}
                    </option>
                  );
                })}
              </select>
            </div>
            <label className="mb-1 ml-6 " htmlFor="equipe2">
              Equipe 2
            </label>
            <div className="w-full mb-[1rem] h-[30px] bg-gray-300 border overflow-hidden border-blue-400 flex items-center px-2 rounded-full">
              <select
                onChange={(e) =>
                  setMatch({ ...match, equipe2_id: e.target.value })
                }
                name="equipe2_id"
                id="equipe2"
                className="text-blue-600 bg-gray-300"
              >
                {equipe.map((p) => {
                  return (
                    <option
                      className="border-none outline-none"
                      value={p.id_equipe}
                    >
                      {p.nom}
                    </option>
                  );
                })}
              </select>
            </div>
            <label className="mb-1 ml-6 " htmlFor="stades">
              Nom du Stade
            </label>
            <div className="w-full mb-[1rem] h-[30px] bg-gray-300 border overflow-hidden border-blue-400 flex items-center px-2 rounded-full">
              <select
                onChange={(e) => setMatch({ ...match, stade_id: e.target.value })}
                name="stade_id"
                id="stades"
                className="text-blue-600 bg-gray-300"
              >
                {stade.map((p) => {
                  return (
                    <option
                      className="border-none outline-none"
                      value={p.id_stade}
                    >
                      {p.nom}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="px-3 py-1 font-medium text-white uppercase bg-blue-500 border-none rounded-lg mb-11 m-001 hover:bg-blue-900"
              >
                Programmer Match
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjouterMatch;
