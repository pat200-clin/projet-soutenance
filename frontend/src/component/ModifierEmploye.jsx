import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ModifierEmploye = () => {
  const { id_personnel } = useParams();
  const [employes, setEmploye] = useState({
    nom: "",
    email: "",
    salaire: "",
    ville: "",
    specialite: "",
  });

  const navigate = useNavigate();

  const [specialite, setSpecialite] = useState([]);
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

    axios
      .get(`http://localhost:3000/auth/employes/` + id_personnel)
      .then((result) => {
        setEmploye({
          ...employes,
          nom: result.data.Result[0].nom,
          email: result.data.Result[0].email,
          salaire: result.data.Result[0].salaire,
          ville: result.data.Result[0].ville,
          specialite: result.data.Result[0].specialite_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3000/auth/modifier_employe/` + id_personnel,
        employes
      )
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employes");
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
      <div className="relative rounded-xl mt-[4rem] w-[55vw] h-[65vh] bg-cyan-100 ">
        <div className="absolute top-0 flex items-center justify-center w-full h-full">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full min-w-full p-100"
          >
            <h2 className="text-3xl mb-[1rem] mt-[2rem] text-indigo-500">
              Modifier les informations
            </h2>
            <div className="w-full h-[30px]  bg-gray-300 border mb-[1rem]  border-blue-400 flex items-center px-2 rounded-full">
              <input
                onChange={(e) =>
                  setEmploye({ ...employes, nom: e.target.value })
                }
                id="inputNom"
                autoComplete="off"
                type="text"
                placeholder="Entrez le nom"
                name="nom"
                value={employes.nom}
                className="w-[70vw] uppercase text-sm font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>
            <div className="w-full h-[30px] mb-[1rem] bg-gray-300 border overflow-hidden border-blue-400 flex items-center px-2 rounded-full">
              <input
                onChange={(e) =>
                  setEmploye({ ...employes, email: e.target.value })
                }
                autoComplete="off"
                id="inputEmail"
                type="email"
                placeholder="Entrez l'adresse email"
                name="email"
                value={employes.email}
                className="w-[70vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>

            <div className="w-full mb-[1rem] h-[30px] bg-gray-300 border overflow-hidden border-blue-400 flex items-center px-2 rounded-full">
              <select
                onChange={(e) =>
                  setEmploye({ ...employes, specialite: e.target.value })
                }
                autoComplete="off"
                name="specialite"
                id="specialite"
                className="text-blue-600 bg-gray-300"
              >
                {specialite.map((s) => {
                  return (
                    <option
                      className="border-none outline-none"
                      value={s.id_specialite}
                    >
                      {s.nom}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full justify-center mb-[1rem] h-[30px] bg-gray-300 border overflow-hidden border-blue-400 flex items-center px-2 rounded-full">
              <input
                onChange={(e) =>
                  setEmploye({ ...employes, salaire: e.target.value })
                }
                autoComplete="off"
                id="inputSalaire"
                type="text"
                placeholder="Entrez le salaire"
                name="salaire"
                value={employes.salaire}
                className="w-[70vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>
            <div className="w-full justify-center mb-[1rem] h-[30px] bg-gray-300 border overflow-hidden border-blue-400 flex items-center px-2 rounded-full">
              <input
                onChange={(e) =>
                  setEmploye({ ...employes, ville: e.target.value })
                }
                autoComplete="off"
                id="inputVille"
                type="text"
                placeholder="Entrez la ville"
                name="ville"
                value={employes.ville}
                className="w-[70vw] text-lg font-semibold text-blue-500 border-none outline-none flex-4 bg-inherit "
              />
            </div>
            <button
              type="submit"
              className="w-[250px] py-2 border-none mb-[4rem] rounded-lg bg-blue-500 text-white font-medium m-001 uppercase hover:bg-blue-900"
            >
              Modifier Employe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifierEmploye;
