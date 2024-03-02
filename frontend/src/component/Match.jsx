import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Match = () => {
  const [match, setMatch] = useState([]);
  const [equipe, setEquipe] = useState([]);
  const [scoreEquipe1, setScoreEquipe1] = useState(0);
  const [scoreEquipe2, setScoreEquipe2] = useState(0);

  const { rencontre_id } = useParams();

  const getEquipeNameById = (equipeId) => {
    const equipeItem = equipe.find((m) => m.id_equipe === equipeId);
    return equipeItem ? equipeItem.nom : "";
  };
  const getImageNameById = (equipeId) => {
    const equipeItem = equipe.find((m) => m.id_equipe === equipeId);
    return equipeItem ? equipeItem.image : "";
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/match`)
      .then((result) => {
        if (result.data.Status) {
          setMatch(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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

  const handleScoreChange = (equipe, valeur) => {
    if (equipe === "equipe1") {
      setScoreEquipe1(scoreEquipe1 + valeur);
    } else {
      setScoreEquipe2(scoreEquipe2 + valeur);
    }
  };

 

  return (
    <div className=" bg-[url(./assets/jonathan-petersson-ARU18GpF6QQ-unsplash.jpg)] bg-cover bg-center flex items-center justify-center h-screen w-screen">
      {match.map((m) => (
        <div className="absolute shadow-lg  h-[38%] w-[47%] bg-white top-0 mt-4 rounded-xl  ">
          <div className="flex items-center justify-around">
            <div className="mt-5 ">
              <p className="text-2xl text-center ">Local Team</p>
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  <img
                    src={
                      `http://localhost:3000/Image/` +
                      getImageNameById(m.equipe1_id)
                    }
                    alt=""
                    className=" mt-2 h-[4.5rem] w-[4.5rem]"
                  />
                </div>
              </div>
              <p className="mt-2 mr-4 text-center ">
                {getEquipeNameById(m.equipe1_id)}
              </p>
              <div className="flex items-center justify-center mt-2">
                <form onSubmit={handleSubmit}>
                <button
                  onClick={() => handleScoreChange("equipe1", -1)}
                  className="px-4 py-1 mr-4 text-xl text-white bg-red-400 rounded-xl"
                >
                  but rejete
                </button>
                <button
                  onClick={() => handleScoreChange("equipe1", 1)}
                  className="px-3 py-1 text-lg text-white bg-emerald-400 rounded-xl "
                >
                  but accorde
                </button>
                </form>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center">
                <p name="equipe1" className="mt-5 text-3xl text-center">
                {scoreEquipe1}
                </p>
                <p className="mt-5 text-3xl text-center">-</p>
                <p name="equipe2" className="mt-5 text-3xl text-center">
                {scoreEquipe2}
                </p>
              </div>
              <p className="text-lg text-center">45'+1</p>
            </div>
            <div className="mt-5">
              <p className="mr-4 text-2xl text-center">Away Team</p>
              <div className="flex items-center justify-center">
                <img
                  src={
                    `http://localhost:3000/Image/` +
                    getImageNameById(m.equipe2_id)
                  }
                  alt=""
                  className=" mt-2 h-[4.5rem] w-[4.5rem] "
                />
              </div>
              <p className="mt-2 mr-3 text-center">
                {getEquipeNameById(m.equipe2_id)}
              </p>
              <div className="flex items-center justify-center mt-2">
               <form onSubmit={handleSubmit}>
               <button
                  onClick={() => handleScoreChange("equipe2", 1)}
                  className="px-3 py-1 text-lg text-white bg-emerald-400 rounded-xl "
                >
                  but accorde
                </button>
                <button
                  onClick={() => handleScoreChange("equipe2", -1)}
                  className="px-4 py-1 ml-4 text-xl text-white bg-red-400 rounded-xl"
                >
                  but rejete
                </button>
               </form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Match;
