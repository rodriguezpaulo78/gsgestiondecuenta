'use strict';

var Fuente = require('../models/info_Fuente_model.js');


exports.list_all_fuente = function(req, res) {
    Fuente.getAllFuente(req.body.dataToken.cadenaDeConexion,function(err, fuente) {
      if (err){
        res.send(err);
      }else{
        res.send(fuente);
      }
    });
};
  

exports.create_a_fuente= function(req, res) {
  var new_fuente = new Fuente(req.body);
  Fuente.createFuente(req.body.dataToken.cadenaDeConexion, new_fuente, function(err, fuente) {
    if (err){
      res.send(err);
    }else{
      res.json(fuente);
    }
  });
};