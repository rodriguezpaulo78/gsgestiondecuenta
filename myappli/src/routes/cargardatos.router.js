const express = require('express');
const router = express.Router();
const RevisarTokenReact = require('../middlewares/revisarTokenReact');

var Producto = require('../models/info_Productos_model.js');

router.get('/cargardatos', RevisarTokenReact, (req, res) => {
    res.send("Cargar datos");
});

module.exports = router;