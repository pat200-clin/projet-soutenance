import React from "react";
import Login from "./component/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Home from "./component/Home";
import Player from "./component/Player";
import Poste from "./component/Poste";
import Profil from "./component/Profil";
import Equipe from "./component/Equipe";
import Rencontre from "./component/Rencontre";
import Employes from "./component/Employes";
import AjouterPoste from "./component/AjouterPoste";
import AjouterJoueur from "./component/AjouterJoueur";
import AjouterSpecialite from "./component/AjouterSpecialite";
import Specialite from "./component/Specialite";
import AjouterEmploye from "./component/AjouterEmploye";
import AjouterEquipe from "./component/AjouterEquipe";
import ModifierEmploye from "./component/ModifierEmploye";
import ModifierJoueur from "./component/ModifierJoueur";
import ModifierEquipe from "./component/ModifierEquipe";
import AjouterMatch from "./component/AjouterMatch";
import Start from "./component/Start";
import PersonnelLogin from "./component/PersonnelLogin";
import PlayerLogin from "./component/PlayerLogin";
import AjouterStade from "./component/AjouterStade";
import Stadium from "./component/Stadium";
import Match from "./component/Match";
import ScoreBoard from "./component/ScoreBoard";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<Start />}></Route>
        <Route path="/adminLogin" element={<Login />}></Route>
        <Route path="/personnel_login" element={<PersonnelLogin />}></Route>
        <Route path="/player_login" element={<PlayerLogin />}></Route>
        <Route path="/match" element={<Match />}></Route>
        <Route path="/scoreboard" element={<ScoreBoard />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/player" element={<Player />}></Route>
          <Route path="/dashboard/poste" element={<Poste />}></Route>
          <Route path="/dashboard/stadium" element={<Stadium />}></Route>
          <Route path="/dashboard/profil" element={<Profil />}></Route>
          <Route path="/dashboard/equipe" element={<Equipe />}></Route>
          <Route path="/dashboard/rencontre" element={<Rencontre />}></Route>
          <Route path="/dashboard/rencontre" element={<Rencontre />}></Route>
          <Route path="/dashboard/employes" element={<Employes />}></Route>
          <Route path="/dashboard/specialite" element={<Specialite />}></Route>
          <Route path="/dashboard/ajouter_stade" element={<AjouterStade />}></Route>
          <Route path="/dashboard/ajouter_poste" element={<AjouterPoste />}></Route>
          <Route path="/dashboard/ajouter_joueur" element={<AjouterJoueur />}></Route>
          <Route path="/dashboard/ajouter_specialite" element={<AjouterSpecialite />}></Route>
          <Route path="/dashboard/ajouter_employe" element={<AjouterEmploye />}></Route>
          <Route path="/dashboard/ajouter_equipe" element={<AjouterEquipe />}></Route>
          <Route path="/dashboard/ajouter_match" element={<AjouterMatch />}></Route>
          <Route path="/dashboard/modifier_employe/:id_personnel" element={<ModifierEmploye />}></Route>
          <Route path="/dashboard/modifier_joueur/:id_joueur" element={<ModifierJoueur />}></Route>
          <Route path="/dashboard/modifier_equipe/:id_equipe" element={<ModifierEquipe />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
