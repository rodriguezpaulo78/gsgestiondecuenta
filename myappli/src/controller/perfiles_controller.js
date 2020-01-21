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

exports.create_a_perfil = function(req, res) {
    var new_perfil = new Perfil(req.body);
    
    Perfil.createPerfil(req.body.dataToken.cadenaDeConexion, new_perfil, function(err, perfil) {
      
      if (err)
        res.send(err);
      res.json(perfil);
    });
  
  };