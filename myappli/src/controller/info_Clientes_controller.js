'use strict';

var Clientes = require('../models/info_Clientes_model.js');

exports.read_a_cliente = function(req, res) {
    Clientes.getClienteById(req.body.dataToken.cadenaDeConexion, req.params.clienteId, function(err, cliente) {
      if (err){
          res.send(err);
      }else{
          res.json(cliente);
      }
    });
  };


exports.create_a_cliente= function(req, res) {
    var new_cliente = new Clientes(req.body);
    Clientes.createCliente(req.body.dataToken.cadenaDeConexion, new_cliente, function(err, cliente) {
      if (err){
          res.send(err);
      }else{
          res.json(cliente);
      }
    });
  
};
