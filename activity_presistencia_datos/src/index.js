const express  = require("express");
const servidor = express();

servidor.set("port", process.env.PORT || 3000);
servidor.use(express.json());
servidor.use(express.urlencoded({extended:true}));

servidor.set("view engine", "hbs");
servidor.use(require("./routes/estudiantes.js"));

servidor.listen(servidor.get("port"), function(){
    console.log("Sevidor conectado desde el puerto:"+servidor.get("port"))
});