const express  = require("express");
const ruta     = express.Router();
const conexion = require("../conexion.js");

ruta.get("/",function(req, res){
    conexion.query("SELECT * FROM t_productos",function(error, filas, campos){
        if(!error){
            res.render("../views/index",{contenido:filas});
        }else{
            res.send(error);
        }
    });    
});
ruta.get("/registrar",function(req, res){
    res.render("../views/frmRegistro");
});
ruta.post("/registrar",function(req, res){
    const {nombre , precio, descripcion} = req.body;
    conexion.query("INSERT INTO t_productos(PRO_NOMBRE,PRO_PRECIO,PRO_DESCRIPCION)VALUES(?,?,?)",
    [nombre , precio, descripcion],function(error, filas, campos){
        if(!error){
            res.send(`Producto registrado <br> <a href="/">Ir a inicio</>`)
        }else{
            res.send(error);
        }
    });
});

ruta.get("/eliminar/:id",function(req, res){
    const {id} = req.params;
    conexion.query("DELETE FROM t_productos WHERE PRO_ID = ?",
    [id],function(error, filas, campos){
        if(!error){
            res.send(`Producto ELIMINADO <br> <a href="/">Ir a inicio</>`)
        }else{
            res.send(error);
        }
    });
});


ruta.get("/actualizarRegistro/:id",function(req, res){
    const {id} = req.params;
    conexion.query("SELECT * FROM t_productos WHERE PRO_ID = ? ",[id],function(error, filas, campos){
        if(!error){
            res.render("../views/actualizarRegistro",{contenido:filas});
        }else{
            res.send(error);
        }
    });    
});



ruta.post("/actualizarRegistro/:id",function(req, res){
    const {nombre , precio, descripcion} = req.body;
    const {id} = req.params
    conexion.query("UPDATE t_productos SET PRO_NOMBRE = ?, PRO_PRECIO = ?, PRO_DESCRIPCION = ? WHERE PRO_ID = ? ",
    [nombre , precio, descripcion, id],function(error, filas, campos){
        if(!error){
            res.send(`Producto ACTUALIZADO <br> <a href="/">Ir a inicio</>`)
        }else{
            res.send(error);
        }
    });
});

module.exports = ruta;