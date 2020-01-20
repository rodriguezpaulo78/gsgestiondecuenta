const express = require('express');
const router = express.Router();
var todoList = require('../controller/info_Fuentes_controller');
const RevisarTokenReact = require('../middlewares/revisarTokenReact');

router.get('/fuentes', RevisarTokenReact, todoList.list_all_fuente)
    .post('/fuentes', RevisarTokenReact, todoList.create_a_fuente);

module.exports = router;
      