import mysql from'mysql'

const conn = mysql.createConnection({
    host :"localhost",
    user:"root",
    password:"",
    database:"JOUEUR"
})

conn.connect(function (err){
    if (err){
        console.log("erreur de connexion")
    } else {
        console.log("connexion reussie")
    }
})

export default conn;