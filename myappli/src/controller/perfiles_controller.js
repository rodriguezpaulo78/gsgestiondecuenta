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

  exports.list_all_grupo = function(req, res) {
    Perfil.getAllGrupo(req.body.dataToken.cadenaDeConexion, function(err, grupo) {
  
      console.log('controller')
      if (err)
        res.send(err);
        console.log('res', grupo);
      res.send(grupo);
    });
  };

  exports.list_all_permisos = function(req, res) {
    Perfil.getAllPermisos(req.body.dataToken.cadenaDeConexion, function(err, permiso) {
  
      console.log('controller')
      if (err)
        res.send(err);
        console.log('res', permiso);
      res.send(permiso);
    });
  };