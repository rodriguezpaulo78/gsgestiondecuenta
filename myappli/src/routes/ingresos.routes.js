const express = require('express');
const router = express.Router();
var todoList = require('../controller/info_ingresos_controller');
const RevisarTokenReact = require('../middlewares/revisarTokenReact');


router.get('/ingresos/:ingresoId', RevisarTokenReact, todoList.read_a_ingreso)
  .delete('/ingresos/:ingresoId', RevisarTokenReact, todoList.delete_a_ingreso);

router.post('/ingresos', RevisarTokenReact,todoList.create_a_ingreso);

router.get('/ingresos/:fI/:fF/:tOp', RevisarTokenReact, todoList.list_all_ingreso);

router.get('/reportes/:fI/:fF/:idSucursal', RevisarTokenReact, todoList.get_reports);

router.get('/utilidad/:fI/:fF/:idSucursal', RevisarTokenReact, todoList.get_utilidad);

router.get('/cuentasxpagar/:fI/:fF/:idSucursal', RevisarTokenReact, todoList.get_reports_cuentas);

router.get('/pagos/:idIngreso', RevisarTokenReact, todoList.list_all_pagos);

router.put('/ingresos/:ingresoId/:field/:value', RevisarTokenReact, todoList.update_a_ingreso);

router.get('/ingresos/reporte/excel/:fI/:fF/:tOp', RevisarTokenReact, todoList.export_excel);

module.exports = router;
