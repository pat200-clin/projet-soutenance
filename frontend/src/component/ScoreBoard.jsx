import React, { useEffect, useState } from "react";
import axios from "axios";

const ScoreBoard = () => {

  const [match, setMatch] = useState([]);
  const [equipe, setEquipe] = useState([]);
  const [scoreEquipe1, setScoreEquipe1] = useState(0);
  const [scoreEquipe2, setScoreEquipe2] = useState(0);
  

  const getEquipeNameById = (equipeId) => {
    const equipeItem = equipe.find(
      (m) => m.id_equipe === equipeId
    );
    return equipeItem ? equipeItem.nom : "";
  };
  const getImageNameById = (equipeId) => {
    const equipeItem = equipe.find(
      (m) => m.id_equipe === equipeId
    );
    return equipeItem ? equipeItem.image : "";
  };

  useEffect(() => {
    // Chargement du score initial depuis la base de données
    axios
      .get("/match")
      .then((result) => {
        if (result.data.Status) {
          setScore(result.data.Result);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios.get("/scoreboard")
      .then((response) => {
        if (response.data.Status) {
          setScoreEquipe1(response.data.Result);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    axios.get("/scoreboard")
      .then((response) => {
        if (response.data.Status) {
          setScoreEquipe2(response.data.Result);
        }
      })
      .catch((error) => console.error(error));
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
    

      return (
        <div className=" bg-[url(./assets/jonathan-petersson-ARU18GpF6QQ-unsplash.jpg)] bg-cover bg-center flex items-center justify-center h-screen w-screen">
          <div className="absolute shadow-lg  h-[35%] w-[37%] bg-white top-0 mt-4 rounded-xl  ">
            {match.map((m) => (
              <div className="flex items-center justify-around">
                <div className="mt-5 ">
                  <p className="text-2xl text-center ">Local Team</p>
                  <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center">
                  <img
                      src={`http://localhost:3000/Image/` + getImageNameById(m.equipe1_id)}
                      alt=""
                      className=" mt-2 h-[4.5rem] w-[4.5rem]"
                    />
                  </div>
                   
                  </div>
                  <p className="mt-2 mr-4 text-center ">{getEquipeNameById(m.equipe1_id)}</p>
                </div>
                <div>
                  <div className="flex items-center justify-center">
                  <p className="mt-5 text-3xl text-center">{scoreEquipe1}</p>
                  <p className="mt-5 text-3xl text-center">-</p>
                  <p className="mt-5 text-3xl text-center">{scoreEquipe2}</p>
                  </div>
                  <p className="text-lg text-center">45'+1</p>
                </div>
                <div className="mt-5">
                  <p className="mr-4 text-2xl text-center">Away Team</p>
                  <div className="flex items-center justify-center">
                    <img
                      src={`http://localhost:3000/Image/` +getImageNameById( m.equipe2_id)}
                      alt=""
                      className=" mt-2 h-[4.5rem] w-[4.5rem] "
                    />
                  </div>
                  <p className="mt-2 mr-3 text-center">{getEquipeNameById(m.equipe2_id)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
    

export default ScoreBoard