const express = require('express');
const router = express.Router();
var todoList = require('../controller/info_Detalles_controller');
const RevisarTokenReact = require('../middlewares/revisarTokenReact');


router.get('/detalles/:detallesId', RevisarTokenReact, todoList.read_a_detalles);
 
router.post('/detalles', RevisarTokenReact, todoList.create_a_detalle);

router.get('/detalles/referencia/:idReferencia', RevisarTokenReact, todoList.get_referencia);

router.post('/detalles/referencia', RevisarTokenReact, todoList.updateCostVenta);

module.exports = router;
      