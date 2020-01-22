'use strict';
var Sucursal = require('../models/info_Sucursales_model.js');

exports.read_a_sucursal = function(req, res) {
  Sucursal.getSucursalById(req.body.dataToken.cadenaDeConexion, req.params.sucursalId, function(err, sucursal) {
    if (err)
      res.send(err);
    res.json(sucursal);
  });
 };

exports.list_all_sucursal = function(req, res) {
  Sucursal.getAllSucursal(req.body.dataToken.cadenaDeConexion,function(err, sucursal) { 
    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', sucursal);
    res.send(sucursal);
  });
};
  

exports.create_a_sucursal = function(req, res) {
  var new_sucursal = new Sucursal(req.body);
    
  Sucursal.createSucursal(req.body.dataToken.cadenaDeConexion, new_sucursal, function(err, sucursal) {
      
    if (err)
      res.send(err);
    res.json(sucursal);
  });
};
  