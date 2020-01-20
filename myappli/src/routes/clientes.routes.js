const express = require('express');
const router = express.Router();
var todoList = require('../controller/info_Clientes_controller');
const RevisarTokenReact = require('../middlewares/revisarTokenReact');


router.get('/clientes/:clienteId', RevisarTokenReact, todoList.read_a_cliente);
 
router.post('/clientes', RevisarTokenReact, todoList.create_a_cliente);

module.exports = router;
      