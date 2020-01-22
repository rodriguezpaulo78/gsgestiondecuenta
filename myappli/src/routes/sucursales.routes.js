const express = require('express');
const router = express.Router();
var SucursalController = require('../controller/info_Sucursales_controller');
const RevisarTokenReact = require('../middlewares/revisarTokenReact');

router.get('/sucursales/:sucursalId', RevisarTokenReact, SucursalController.read_a_sucursal);
router.get('/sucursales', RevisarTokenReact, SucursalController.list_all_sucursal).post('/sucursales', RevisarTokenReact, SucursalController.create_a_sucursal);

module.exports = router;
      