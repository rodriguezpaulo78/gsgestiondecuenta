'use strict';

var Negocio = require('../models/info_Negocio_model');

exports.datosImpresion = function(req, res){
    Negocio.obtenerDatosImpresion(req.body.dataToken.cadenaDeConexion,function (err, datos) {
        if (err){
            res.send(err);
        }else{
            res.json(datos[0]);
        }
    });
};

exports.actualizarDatos = function (req, res) {
    Negocio.actualizarDatosEmpresa(req.body.dataToken.cadenaDeConexion, req.body, (err, result) => {
        if (err){
            console.log("Error en actualizar datos empresa");
            console.log(err);
            res.send(err);
        }else{
            console.log("Datos actualizados de empresa");
            res.send(result);
        }
    });
}