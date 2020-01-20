const express = require('express');
const router = express.Router();
var todoList = require('../controller/info_Sucursales_controller');
const RevisarTokenReact = require('../middlewares/revisarTokenReact');

router.get('/sucursales/:sucursalId', RevisarTokenReact, todoList.read_a_sucursal);
 
router.get('/sucursales', RevisarTokenReact, todoList.list_all_sucursal)
    .post('/sucursales', RevisarTokenReact, todoList.create_a_sucursal);


module.exports = router;
      