'use strict';

var Partida = require('../models/info_Partidas_model.js');


exports.list_all_partida = function(req, res) {
    Partida.getAllPartida(req.body.dataToken.cadenaDeConexion, function(err, partida) {
  
      console.log('controller')
      if (err)
        res.send(err);
        console.log('res', partida);
      res.send(partida);
    });
  };
  

  exports.list_all_grupo_partida = function(req, res) {
    Partida.getAllGrupoPartida(req.body.dataToken.cadenaDeConexion, function(err, grupo) {
  
      console.log('controller')
      if (err)
        res.send(err);
        console.log('res', grupo);
      res.send(grupo);
    });
  };
  

  exports.create_a_partida = function(req, res) {
    var new_partida = new Partida(req.body);
    
    Partida.createPartida(req.body.dataToken.cadenaDeConexion, new_partida, function(err, partida) {
      
      if (err)
        res.send(err);
      res.json(partida);
    });
  
  };

  //createGrupo
  exports.create_partida = function(req, res) {
   let partida_new={
      idPartida:req.body.idPartida,
      nombrePartida:req.body.nombrePartida,
      idGrupo:req.body.idGrupo
    }
    let new_partida;
    if(req.body.idGrupo=='OTRO'){

      Partida.createGrupo(req.body.dataToken.cadenaDeConexion, req.body.nombreGrupo, function(err, grupo) {
        
        if (err)
          res.send(err);
       // res.json(grupo);
       console.log('nombre ',grupo);
        partida_new.idGrupo=grupo;
        new_partida = new Partida(partida_new);     
     
        Partida.createPartida(req.body.dataToken.cadenaDeConexion, new_partida, function(err, partida) {
            
          if (err)
            res.send(err);
          res.json(partida);
        });
       
      });

    }else{
      new_partida = new Partida(partida_new);     
     
      Partida.createPartida(req.body.dataToken.cadenaDeConexion, new_partida, function(err, partida) {
          
        if (err)
          res.send(err);
        res.json(partida);
      });
    }
   
  
  };
