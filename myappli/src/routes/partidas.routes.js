const express = require('express');
const router = express.Router();
var todoList = require('../controller/info_Partidas_controller');
const RevisarTokenReact = require('../middlewares/revisarTokenReact');

router.get('/partidas', RevisarTokenReact, todoList.list_all_partida)
    .post('/partidas', RevisarTokenReact, todoList.create_partida);

router.get('/grupos', RevisarTokenReact, todoList.list_all_grupo_partida);

module.exports = router;
