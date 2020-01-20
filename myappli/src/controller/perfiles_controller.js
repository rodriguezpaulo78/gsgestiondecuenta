'use strict';

let Perfil = require('../models/perfiles_model');

exports.obtenerPerfiles = function (req, res) {
    Perfil.obtenerListaPerfiles(req.body.dataToken.cadenaDeConexion, (err, result) => {
        if (err){
            res.send({status: "error", msg: "Error al obtener los datos almacenados.", data: []});
        }else{
            res.send({status: "ok", msg: "Lista obtenida de perfiles", data: result});
        }
    });
};