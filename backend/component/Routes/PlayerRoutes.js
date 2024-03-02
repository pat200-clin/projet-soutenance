import express from "express";
import conn from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/player_login", (req, res) => {
    const sql = "SELECT * FROM player WHERE email = ?";
    conn.query(sql, [req.body.email], (err, result) => {
      if (err)
        return res.json({ loginStatus: false, Error: "erreur de requete" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
          if (err)
            return res.json({ loginStatus: false, Error: "erreur de requete" });
          if (response) {
            const email = result[0].email;
            const token = jwt.sign(
              { role: "player", email: email },
              "player_secret_key",
              { expiresIn: "30m" }
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
      }
    });
  });

  export { router as PlayerRouter };