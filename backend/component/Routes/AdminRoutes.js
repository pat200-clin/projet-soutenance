import express from "express";
import conn from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminLogin", (req, res) => {
  const sql = "SELECT * FROM administrator WHERE email = ? AND password = ?";
  conn.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err)
      return res.json({ loginStatus: false, Error: "erreur de requete" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({
        loginStatus: false,
        Error: "email ou mot de passe incorrect",
      });
    }
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Image");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/ajouter_employe", upload.single("images"), (req, res) => {
  const sql = `INSERT INTO personnel (nom,email,password,salaire,ville,image,specialite_id) VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    const values = [
      req.body.nom,
      req.body.email,
      hash,
      req.body.salaire,
      req.body.ville,
      req.file.filename,
      req.body.specialite,
    ];
    conn.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: err });
      return res.json({ Status: true });
    });
  });
});
router.post("/ajouter_joueur", upload.single("images"), (req, res) => {
  const sql = `INSERT INTO player (nom,email,password,dorsard,versement,image,poste_id) VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    const values = [
      req.body.nom,
      req.body.email,
      hash,
      req.body.dorsard,
      req.body.versement,
      req.file.filename,
      req.body.poste,
    ];
    conn.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: err });
      return res.json({ Status: true });
    });
  });
});

router.post("/ajouter_match", (req, res) => {
  const sql = `INSERT INTO rencontre (date_match, heure_match, categorie, equipe1_id, equipe2_id, stade_id) VALUES (?,?,?,?,?,?)`;
  conn.query(
    sql,
    [
      req.body.dates,
      req.body.heure,
      req.body.categorie,
      req.body.equipe1_id,
      req.body.equipe2_id,
      req.body.stade_id,
    ],
    (err, result) => {
      if (err) return res.json({ Status: false, Error: err });
      return res.json({ Status: true });
    }
  );
});

router.post("/ajouter_equipe", upload.single("images"), (req, res) => {
  const sql = `INSERT INTO equipe (nom,image) VALUES (?)`;
  const values = [req.body.nom, req.file.filename];
  conn.query(sql, [values], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true });
  });
});

router.post("/ajouter_poste", (req, res) => {
  const sql = "INSERT INTO poste (`nom`) VALUES (?)";
  conn.query(sql, [req.body.poste], (err, result) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    return res.json({ Status: true });
  });
});
router.post("/ajouter_stade", (req, res) => {
  const sql = "INSERT INTO stade (`nom`) VALUES (?)";
  conn.query(sql, [req.body.stade], (err, result) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    return res.json({ Status: true });
  });
});

router.get("/poste", (req, res) => {
  const sql = "SELECT * FROM poste ";
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/stadium", (req, res) => {
  const sql = "SELECT * FROM stade ";
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/ajouter_specialite", (req, res) => {
  const sql = "INSERT INTO specialite (`nom`) VALUES (?)";
  conn.query(sql, [req.body.specialite], (err, result) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    return res.json({ Status: true });
  });
});

router.get("/specialite", (req, res) => {
  const sql = "SELECT * FROM specialite ";
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/equipe", (req, res) => {
  const sql = "SELECT * FROM equipe ";
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/equipe/:id_equipe", (req, res) => {
  const id_equipe = req.params.id_equipe;
  const sql = "SELECT * FROM equipe WHERE id_equipe = ? ";
  conn.query(sql, [id_equipe], (err, result) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/modifier_equipe/:id_equipe", (req, res) => {
  const id_equipe = req.params.id_equipe;
  const sql = `UPDATE equipe SET nom = ? WHERE id_equipe = ?`;
  const values = [req.body.nom];
  conn.query(sql, [...values, id_equipe], (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "mauvaise requete" + err });
    return res.json({ Status: true, Result: result });
  });
});
router.get("/match", (req, res) => {
  // SQL query to get the score
  const sql = `SELECT * FROM rencontre `;
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/delete_equipe/:id_equipe", (req, res) => {
  const id_equipe = req.params.id_equipe;
  const sql = "delete from equipe where id_equipe = ?";
  conn.query(sql, [id_equipe], (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "mauvaise requete" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employes", (req, res) => {
  const sql = "SELECT * FROM personnel ";
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employes/:id_personnel", (req, res) => {
  const id_personnel = req.params.id_personnel;
  const sql = "SELECT * FROM personnel WHERE id_personnel = ?";
  conn.query(sql, [id_personnel], (err, result) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    return res.json({ Status: true, Result: result });
  });
});

router.put(`/modifier_employe/:id_personnel`, (req, res) => {
  const id_personnel = req.params.id_personnel;
  const sql = `UPDATE personnel SET nom = ?, email = ?, salaire = ?, ville = ?, specialite_id = ? WHERE id_personnel = ?`;
  const values = [
    req.body.nom,
    req.body.email,
    req.body.salaire,
    req.body.ville,
    req.body.specialite,
  ];
  conn.query(sql, [...values, id_personnel], (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "mauvaise requete" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/delete_employe/:id_personnel", (req, res) => {
  const id_personnel = req.params.id_personnel;
  const sql = "delete from personnel where id_personnel  = ?";
  conn.query(sql, [id_personnel], (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "mauvaise requete" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/player", (req, res) => {
  const sql = "SELECT * FROM player";
  conn.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    return res.json({ Status: true, Result: result });
  });
});
router.get("/player/:id_joueur", (req, res) => {
  const id_joueur = req.params.id_joueur;
  const sql = "SELECT * FROM player WHERE id_joueur = ? ";
  conn.query(sql, [id_joueur], (err, result) => {
    if (err) return res.json({ Status: false, Error: "mauvaise requete" });
    return res.json({ Status: true, Result: result });
  });

  router.put(`/modifier_joueur/:id_joueur`, (req, res) => {
    const id_joueur = req.params.id_joueur;
    const sql = `UPDATE player SET nom = ?, email = ?, dorsard = ?, versement = ?, poste_id = ? WHERE id_joueur = ?`;
    const values = [
      req.body.nom,
      req.body.email,
      req.body.dorsard,
      req.body.versement,
      req.body.poste,
    ];
    conn.query(sql, [...values, id_joueur], (err, result) => {
      if (err)
        return res.json({ Status: false, Error: "mauvaise requete" + err });
      return res.json({ Status: true, Result: result });
    });
  });
});

router.delete("/delete_player/:id_joueur", (req, res) => {
  const id_joueur = req.params.id_joueur;
  const sql = "DELETE FROM player WHERE id_joueur = ?";
  conn.query(sql, [id_joueur], (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "mauvaise requete" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/admin_count", (req, res) => {
  const sql = "select count (id) as admin from administrator";
  conn.query(sql, (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "mauvaise requete" + err });
    return res.json({ Status: true, Result: result });
  });
});
router.get("/player_count", (req, res) => {
  const sql = "select count (id_joueur) as player from player";
  conn.query(sql, (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "mauvaise requete" + err });
    return res.json({ Status: true, Result: result });
  });
});
router.get("/equipe_count", (req, res) => {
  const sql = "select count (id_equipe) as equipe from equipe";
  conn.query(sql, (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "mauvaise requete" + err });
    return res.json({ Status: true, Result: result });
  });
});
router.get("/employe_count", (req, res) => {
  const sql = "select count (id_personnel) as personnel from personnel";
  conn.query(sql, (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "mauvaise requete" + err });
    return res.json({ Status: true, Result: result });
  });
});
router.get("/salaire_count", (req, res) => {
  const sql = "select sum (salaire) as salairePer from personnel";
  conn.query(sql, (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "mauvaise requete" + err });
    return res.json({ Status: true, Result: result });
  });
});
router.get("/versement_count", (req, res) => {
  const sql = "select sum (versement) as versementPlay from player";
  conn.query(sql, (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "mauvaise requete" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/admin_List", (req, res) => {
  const sql = "select * from administrator";
  conn.query(sql, (err, result) => {
    if (err)
      return res.json({ Status: false, Error: "mauvaise requete" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

router.post("/score", (req, res) => {
  const score = req.body;
  // SQL query to insert score
  const sql = `INSERT INTO score (scoreEquipe1, scoreEquipe2) VALUES (?, ?)`;
  // Execute the query with prepared statement
  conn.query(
    sql,
    [score.scoreEquipe1, score.scoreEquipe2],
    (err, result) => {
      if (err)
        return res.json({ Status: false, Error: "mauvaise requete" + err });
      return res.json({ Status: true, Result: result });
    }
  );
});

export { router as AdminRouter };
