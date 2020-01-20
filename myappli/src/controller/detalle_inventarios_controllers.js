'use strict';

var Inventario = require('../models/info_Inventarios_model.js');

//funcion para poder leer un inventario de la tabla detalle_inventarios en base a su ID
exports.read_a_inventario = function (req, res) {
  Inventario.getInventarioById(req.body.dataToken.cadenaDeConexion, req.params.inventarioId, function (err, inventario) {
    if (err)
      res.send(err);
    res.json(inventario);
  });
};

//funcion para obtener todos los registros de la tabla detalle_inventarios
exports.list_all_inventario = function (req, res) {
  Inventario.getAllInventario(req.body.dataToken.cadenaDeConexion, req.params.fI, req.params.fF, function (err, inventario) {
    if (err)
      res.send(err);
    console.log('res', inventario);
    res.send(inventario);
  });
};

//funcion para actualizar el costo de venta en un detalle de un registro de egreso o ingreso
exports.update_costo_venta = function (req, res) {
  Inventario.updateCostoVenta(req.body.dataToken.cadenaDeConexion, req.params.idDetalle, req.params.idIngreso, req.params.newCostoVenta, function (err, inventario) {
    if (err)
      res.send(err);
    console.log('res', inventario);
    res.send(inventario);
  });
};

// funcion para crear un nuevo registro en la tabla detalle_inventarios 
exports.create_a_inventario = function (req, res) {
  var new_inventario = new Inventario(req.body);
  Inventario.createInventario(req.body.dataToken.cadenaDeConexion, new_inventario, function (err, inventario) {
    if (err)
      res.send(err);
    res.json(inventario);
  });

};