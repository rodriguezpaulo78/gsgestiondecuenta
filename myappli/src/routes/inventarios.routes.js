const express = require('express');
const router = express.Router();
var todoList = require('../controller/detalle_inventarios_controllers');
const RevisarTokenReact = require('../middlewares/revisarTokenReact');


router.get('/inventarios/:inventarioId', RevisarTokenReact, todoList.read_a_inventario);

router.post('/inventarios', RevisarTokenReact,todoList.create_a_inventario);

router.get('/inventarios/:fI/:fF', RevisarTokenReact,todoList.list_all_inventario)

router.put('/inventarios/:idDetalle/:idIngreso/:newCostoVenta', RevisarTokenReact, todoList.update_costo_venta)

module.exports = router;
