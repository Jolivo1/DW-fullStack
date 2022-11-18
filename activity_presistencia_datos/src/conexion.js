const mysql = require("mysql");
const conexion = mysql.createConnection({
    host:     "localhost",
    user:     "root",
    password: "",
    database: "crudestudiantes"
});
conexion.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Conectado a la BD");
    }
});
module.exports = conexion;