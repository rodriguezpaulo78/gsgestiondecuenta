const express = require('express');
const router = express.Router();
const NegocioController = require('../controller/info_Negocio_controller');
const RevisarTokenReact = require('../middlewares/revisarTokenReact');

router.get('/datoscomprobante', RevisarTokenReact, NegocioController.datosImpresion);

router.post('/actualizardatos', RevisarTokenReact, NegocioController.actualizarDatos);

module.exports = router;