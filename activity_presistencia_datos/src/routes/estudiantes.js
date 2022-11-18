const express  = require("express");
const ruta     = express.Router();
const conexion = require("../conexion.js");
var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

ruta.get("/",function(req, res){
    conexion.query("SELECT * FROM estudiantes",function(error, filas, campos){
        if(!error){
            res.render("../views/index",{contenido:filas});
        }else{
            res.send(error);
        }
    });    
});


ruta.get("/registrar",function(req, res){
    res.render("../views/registrar");
});


ruta.post("/registrar",function(req, res){
    const {nombre , pApellido, sApellido, fNacimiento, email, codigo, telefono} = req.body;
    conexion.query("INSERT INTO estudiantes(EST_NOMBRE, EST_PRIMER_APELLIDO, EST_SEGUNDO_APELLIDO, EST_FECHA, EST_CORREO, EST_CODIGO, EST_TELEFONO)VALUES(?,?,?,?,?,?,?)",
    [nombre , pApellido, sApellido, fNacimiento, email, codigo, telefono],function(error, filas, campos){
        if(!error){
            res.redirect("/")
        }else{
            res.send(error);
        }
    });
});


ruta.get("/actualizar/:id",function(req, res){
    const {id} = req.params;
    conexion.query("SELECT * FROM estudiantes WHERE EST_ID = ? ",[id],function(error, filas, campos){
        if(!error){
            res.render("../views/actualizar",{contenido:filas});
        }else{
            res.send(error);
        }
    });    
});

ruta.post("/actualizar/:id",function(req, res){
    const {nombre , pApellido, sApellido, fNacimiento, email, codigo, telefono} = req.body;
    const {id} = req.params
    conexion.query("UPDATE estudiantes SET EST_NOMBRE = ?, EST_PRIMER_APELLIDO = ?, EST_SEGUNDO_APELLIDO = ?, EST_FECHA = ?, EST_CORREO = ?, EST_CODIGO = ?, EST_TELEFONO = ? WHERE EST_ID = ? ",
    [nombre , pApellido, sApellido, fNacimiento, email, codigo, telefono, id],function(error, filas, campos){
        if(!error){
            res.redirect("/")
        }else{
            res.send(error);
        }
    });
});


ruta.get("/eliminar/:id",function(req, res){
    const {id} = req.params;
    conexion.query("DELETE FROM estudiantes WHERE EST_ID = ?",
    [id],function(error, filas, campos){
        if(!error){
            res.redirect("/")
        }else{
            res.send(error);
        }
    });
});



ruta.post("/filtrar",function(req, res){
    const {filtro} = req.body
    conexion.query("SELECT * FROM estudiantes WHERE EST_CODIGO LIKE '"+filtro+"%' OR EST_PRIMER_APELLIDO LIKE '"+filtro+"%'" ,function(error, filas, campos){
        if(!error){
            res.render("../views/index",{contenido:filas});
        }else{
            res.send(error);
        }
    });    
});


module.exports = ruta;