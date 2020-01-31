'use strict';

var Ingreso = require('../models/info_Ingresos_model.js');


exports.read_a_ingreso = function (req, res) {
  Ingreso.getIngresoById(req.body.dataToken.cadenaDeConexion, req.params.ingresoId, function (err, ingreso) {
    if (err)
      res.send(err);
    res.json(ingreso);
  });
};

exports.list_all_ingreso = function (req, res) {
  Ingreso.getAllIngreso(req.body.dataToken.cadenaDeConexion, req.params.fI, req.params.fF, req.params.tOp, function (err, ingreso) {

    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', ingreso);
    res.send(ingreso);
  });
};

exports.export_excel = function(req, res){
  console.log("Controlador de INGRESOS");
  Ingreso.getAllIngreso(req.body.dataToken.cadenaDeConexion, req.params.fI, req.params.fF, req.params.tOp, async function (err, ingresos) {

    if (err){
      res.json({status: "error", msg: "Hubo un erro al obtener lista de ingresos"});
    }else{
      console.log("Todo OK... a generar el excel");
      const cabeceras = [
        "N",
        "MES",
        "HORA EMISIÓN",
        "SUCURSAL",
        "FUENTE",
        "ID PARTIDA",
        "NOMBRE PARTIDA",
        "GRUPO PARTIDA",
        "FECHA EMISIÓN",
        "FECHA VENCIMIENTO",
        "TIPO",
        "SERIE",
        "NÚMERO",
        "NÚMERO DOCUMENTO",
        "RAZÓN SOCIAL",
        "TIPO MONEDA",
        "DETALLE INGRESO",
        "SUM TOTAL VALOR VENTA",
        "SUM TRIBUTOS",
        "SUM PRECIO VENTA",
        "SUM DESCUENTOS",
        "SUM OTROS CARGOS",
        "A CUENTA",
        "COSTO VENTA",
        "COSTO SERVICIO",
        "SALDO",
        "ESTADO",
      ];

      let excelFile = require('excel4node'); // variable del archivo excel
      // Create a new instance of a Workbook class
      let workbook = new excelFile.Workbook();
      // Add Worksheets to the workbook
      let worksheet = workbook.addWorksheet('Registros');

      let estiloCabecera = workbook.createStyle({
        alignment: {
          horizontal: 'center',
          vertical: 'center',
        },
        font: {
          color: '#000000',
          size: 14,
        },
        fill: {
          type: 'pattern', // the only one implemented so far.
          patternType: 'solid', // most common.
          fgColor: '#adff7a',
        }
      });

      let estiloFilaPar = workbook.createStyle({
        alignment: {
          horizontal: 'center'
        },
        border: {
          top: {
            style: 'thin',
            color: '#000000',
          },
          bottom: {
            style: 'thin',
            color: '#000000',
          }
        }
      });

      let estiloFilaImpar = workbook.createStyle({
        alignment: {
          horizontal: 'center'
        },
        border: {
          top: {
            style: 'thin',
            color: '#000000',
          },
          bottom: {
            style: 'thin',
            color: '#000000',
          }
        },
        fill: {
          type: 'pattern', // the only one implemented so far.
          patternType: 'solid', // most common.
          fgColor: '#beb7b5',
        }
      });
      worksheet.column(1).setWidth(12); // N
      worksheet.column(2).setWidth(12); // MES
      worksheet.column(3).setWidth(25); // HORA EMISIÓN
      worksheet.column(4).setWidth(18); // SUCURSAL
      worksheet.column(5).setWidth(18); // FUENTE
      worksheet.column(6).setWidth(14); // ID PARTIDA
      worksheet.column(7).setWidth(20); // NOMBRE PARTIDA
      worksheet.column(8).setWidth(20); // GRUPO PARTIDA
      worksheet.column(9).setWidth(20); // FECHA EMISIÓN
      worksheet.column(10).setWidth(20); // FECHA VENCIMIENTO
      worksheet.column(11).setWidth(12); // TIPO
      worksheet.column(12).setWidth(12); // SERIE
      worksheet.column(13).setWidth(12); // NÚMERO
      worksheet.column(14).setWidth(12); // NÚMERO DOCUMENTO
      worksheet.column(15).setWidth(30); // RAZÓN SOCIAL
      worksheet.column(16).setWidth(12); // TIPO MONEDA
      worksheet.column(17).setWidth(25); // DETALLE INGRESO
      worksheet.column(18).setWidth(12); // SUM TOTAL VALOR VENTA
      worksheet.column( 19).setWidth(12); // SUM TRIBUTOS
      worksheet.column(20).setWidth(12); // SUM PRECIO VENTA
      worksheet.column(21).setWidth(12); // SUM DESCUENTOS
      worksheet.column(22).setWidth(12); // SUM OTROS CARGOS
      worksheet.column(23).setWidth(12); // A CUENTA
      worksheet.column(24).setWidth(12); // COSTO VENTA
      worksheet.column(25).setWidth(12); // COSTO SERVICIO
      worksheet.column(26).setWidth(12); // SALDO
      worksheet.column(27).setWidth(12); // ESTADO

      const FILA_OFFSET = 6;

      // DIBUJANDO LAS CABECERAS

      for (let i = 0; i < cabeceras.length; i++){
        worksheet.cell(FILA_OFFSET, i + 1).string(cabeceras[i]).style(estiloCabecera);
      }

      // ----------------------

      for (let i = 0; i < ingresos.length; i++){
        let fecEmiison = new Date(ingresos[i].fecEmision);
        let fecVencimiento = new Date(ingresos[i].fecVencimiento);
        worksheet.cell(FILA_OFFSET + i + 1, 1).number(ingresos[i].numero).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 2).number(ingresos[i].codMes).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 3).string(ingresos[i].horEmision).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 4).string(ingresos[i].nombreSucursal).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 5).string(ingresos[i].codFuente).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 6).number(ingresos[i].idPartida).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 7).string(ingresos[i].nombrePartida).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 8).string(ingresos[i].nombreGrupo).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 9).string(fecEmiison.getDate() + "-" + (fecEmiison.getMonth() + 1) + "-" + fecEmiison.getFullYear() ).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar); // DATE ingresos[i].fecEmision
        worksheet.cell(FILA_OFFSET + i + 1, 10).string(fecVencimiento.getDate() + "-" + (fecVencimiento.getMonth() + 1) + "-" + fecVencimiento.getFullYear() ).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar); // DATE ingresos[i].fecVencimiento
        worksheet.cell(FILA_OFFSET + i + 1, 11).string(ingresos[i].tipoComprobante === 0? "Boleta": ingresos[i].tipoComprobante === 1 ? "Factura": ingresos[i].tipoComprobante === 2? "Pago": ingresos[i].tipoComprobante === 3? "NC":"Otro").style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 12).string(ingresos[i].numSerieComprobante ? ingresos[i].numSerieComprobante:"").style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 13).string(ingresos[i].numComprobante ? ingresos[i].numComprobante : "").style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 14).string(ingresos[i].numDocUsuario ? ingresos[i].numDocUsuario : "").style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 15).string(ingresos[i].razSocial ? ingresos[i].razSocial : "" ).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 16).string(ingresos[i].tipMoneda).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 17).string(ingresos[i].detalleIngreso? ingresos[i].detalleIngreso : "").style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 18).number(ingresos[i].sumTotValVenta).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 19).number(ingresos[i].sumTotTributos).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 20).number(ingresos[i].sumPrecioVenta).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 21).number(ingresos[i].sumDescTotal).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 22).number(ingresos[i].sumOtrosCargos).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 23).number(ingresos[i].aCuenta).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 24).number(ingresos[i].costVenta).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 25).number(ingresos[i].costServicio).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 26).number(ingresos[i].saldo).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
        worksheet.cell(FILA_OFFSET + i + 1, 27).string(ingresos[i].estado? "VIGENTE": "NO VIGENTE").style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
      }

      const file_name = "Operaciones_Registros.xlsx";
      console.log("Nombre de archivo");
      const rutaBase = require('path').join(__dirname, '../../src/public/files/') + file_name;

      await workbook.write(rutaBase);
      res.download(rutaBase);
    }
  })
};

exports.list_all_pagos = function (req, res) {

  Ingreso.getAllPagos(req.body.dataToken.cadenaDeConexion, req.params.idIngreso, function (err, pagos) {
    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', pagos);
    res.send(pagos);
  });
};

exports.update_a_ingreso = function (req, res) {
  Ingreso.updateById(req.body.dataToken.cadenaDeConexion, req.params.ingresoId, req.params.field, req.params.value, function (err, ingreso) {
    if (err)
      res.send(err);
    res.json(ingreso);
  });
};


exports.create_a_ingreso = function (req, res) {
  var new_ingreso = new Ingreso(req.body);

  Ingreso.createIngreso(req.body.dataToken.cadenaDeConexion, new_ingreso, function (err, ingreso) {
    if (err)
      res.send(err);
    res.json(ingreso);
  });
};

exports.delete_a_ingreso = function (req, res) {
  Ingreso.remove(req.body.dataToken.cadenaDeConexion, req.params.ingresoId, function (err, Ingreso) {
    if (err)
      res.send(err);
    res.json({ message: 'Eliminado exitosamente' });
  });
};

exports.get_reports = function (req, res) {
  Ingreso.GetInfoReports(req.body.dataToken.cadenaDeConexion, req.params.fI, req.params.fF, req.params.idSucursal, function (err, reportes) {
    if (err)
      res.send(err);
    res.json({ data: reportes, data2: "test" });
  });
};

exports.get_utilidad = function (req, res) {
  Ingreso.GetUtilidad(req.body.dataToken.cadenaDeConexion, req.params.fI, req.params.fF, req.params.idSucursal, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.get_reports_cuentas = function (req, res) {
  Ingreso.GetCuentasPagarCobrar(req.body.dataToken.cadenaDeConexion, req.params.fI, req.params.fF, req.params.idSucursal, function (err, reportes) {
    if (err)
      res.send(err);
    res.send(reportes);
    console.log("Reportes");
  });
};