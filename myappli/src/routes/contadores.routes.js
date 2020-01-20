const express = require('express');
const router = express.Router();
const RevisarTokenReact = require('../middlewares/revisarTokenReact');

var todoContadores = require('../controller/contadores_controller');

router.get('/valores/:codigo', RevisarTokenReact, todoContadores.obtenervalorescodigo);

module.exports = router;