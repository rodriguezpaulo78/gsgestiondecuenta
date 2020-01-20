'use strict';

var Detalle = require('../models/info_Detalles_model.js');


exports.read_a_detalles = function(req, res) {
    Detalle.getDetalleById(req.body.dataToken.cadenaDeConexion, req.params.detallesId, function(err, detalle) {
      if (err){
          res.send(err);
      }else{
          res.json(detalle);
      }
    });
  };


exports.get_referencia = function(req, res) {
  Detalle.getDetalleReferencia(req.body.dataToken.cadenaDeConexion, req.params.idReferencia,
      function (err, detalles) {
        if (err){
          res.send(err);
        }else{
          res.json(detalles);
        }
      })
};

exports.create_a_detalle = function(req, res) {
  var new_detalle = new Detalle(req.body);
  Detalle.createDetalle(req.body.dataToken.cadenaDeConexion, new_detalle, function(err, detalle) {
    if (err){
        res.send(err);
    }else{
        res.json(detalle);
    }
  });
};

exports.updateCostVenta = function (req, res) {
  Detalle.updateCostVentaReferencia(
      req.body.idReferencia, req.body.nuevoCostVenta, function (err, result) {
        console.log("DATOS DE FORMULARIO");
        if (err){
          res.json(err);
        }else{
          res.json(result);
        }
      }
  );
};
