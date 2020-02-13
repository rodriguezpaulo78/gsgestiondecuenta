'use strict';
let PerfilModel = require('../models/perfiles_model');

//Método para obtener perfiles
exports.obtenerPerfiles = function (req, res) {
  PerfilModel.obtenerListaPerfiles(req.body.dataToken.cadenaDeConexion, (err, result) => {
    if (err){
      res.send({status: "error", msg: "Error al obtener los perfiles.", data: []});
    }else{
      res.send({status: "ok", msg: "Lista obtenida de perfiles", data: result});
    }
  });
};

//Método para obtener perfiles y sus permisos
exports.obtenerPerfilesYpermisos = function (req, res) {
  PerfilModel.obtenerPerfilesYpermisos(req.body.dataToken.cadenaDeConexion, (err, result) => {
    if (err){
      res.send({status: "error", msg: "Error al obtener los perfiles y permisos", data: []});
    }else{
      res.send({status: "ok", msg: "Lista de perfiles y permisos obtenidos con éxito", data: result});
    }
  });
};

//Método para crear un nuevo perfil
exports.create_a_perfil = function(req, res) {
  //Muestra los datos enviados antes de llegar al modelo
  console.log("OBJ NUEVO PERFIL", req.body);
  var new_perfil = new PerfilModel(req.body);
  PerfilModel.createPerfil(req.body.dataToken.cadenaDeConexion, new_perfil, function(err, perfil) {
    if (err){
      res.send(err);
    }else{
      res.json(perfil);
    }
    });
  };

//Método para obtener todos los grupos de permisos
exports.list_all_grupo = function(req, res) {
  PerfilModel.getAllGrupo(req.body.dataToken.cadenaDeConexion, function(err, grupo) {
    console.log('controller')
    if (err)
      res.send(err);
        console.log('res', grupo);
      res.send(grupo);
    });
};

//Método para obtener todos los permisos 
exports.list_all_permisos = function(req, res) {
  PerfilModel.getAllPermisos(req.body.dataToken.cadenaDeConexion, function(err, permiso) {
    console.log('controller');
    if (err)
      res.send(err);
        console.log('res', permiso);
      res.send(permiso);
    });
  };

//Método para comprobar si existe o no un perfil
exports.existePerfil = function (req, res) {
  //Muestra los datos enviados antes de llegar al modelo
  console.log("CONTROLADOR:", req.body);
  PerfilModel.existePerfil(req.body.dataToken.cadenaDeConexion, req.body.nombrePerfil, (err, result) => {
      if (err){
          console.log(err);
          res.send({status: "error", msg: "Error al validar si existe usuario", data: []});
      }else{
          console.log("validar usuario:", result);
          res.send({status: "ok", msg: "Validación con éxito, compruebe respuesta", data: result});
      }
  });
};