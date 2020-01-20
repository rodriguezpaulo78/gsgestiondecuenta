'use strict';

var Contadores = require('../models/contadores_model');

exports.obtenervalorescodigo = function (req, res) {
    Contadores.obtenerValores(req.body.dataToken.cadenaDeConexion, req.params.codigo, function (err, datos) {
        if (err){
            res.json(err);
        }else{
            res.json(datos);
        }
    })
};