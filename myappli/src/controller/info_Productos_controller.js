'use strict';

var Producto = require('../models/info_Productos_model.js');


exports.read_a_productos = function(req, res) {
    Producto.getProductoById(req.body.dataToken.cadenaDeConexion, req.params.productoId, function(err, producto) {
      if (err)
        res.send(err);
      res.json(producto);
    });
  };

exports.list_all_producto = function(req, res) {
    Producto.getAllProducto(req.body.dataToken.cadenaDeConexion, function(err, producto) {
  
      console.log('controller')
      if (err) {
          res.send(err);
      }else{
          console.log('Todos los productos desde contraldor');
          res.send(producto);
      }
    });
  };

exports.create_a_producto = function(req, res) {
    var new_producto = new Producto(req.body);
    
    Producto.createProducto(req.body.dataToken.cadenaDeConexion, new_producto, function(err, producto) {

      if (err){
        res.send(err);
        console.log("error al crear producto desde WEB");
      }
      res.json(producto);
    });
  
  };

exports.load_data_csv = function (req, res) {
/*
    let opciones_tipo_medida_lista = [];
    opciones_tipo_medida_lista["NIU"] = 'Unidad (Bienes)' ;
    opciones_tipo_medida_lista["ZZ"] = 'Unidad (Servicios)' ;
    opciones_tipo_medida_lista["4A"] = 'Bobinas' ;
    opciones_tipo_medida_lista["BJ"] = 'Balde' ;
    opciones_tipo_medida_lista["BLL"] = 'Barriles' ;
    opciones_tipo_medida_lista["BG"] = 'Bolsa' ;
    opciones_tipo_medida_lista["BO"] = 'Botellas' ;
    opciones_tipo_medida_lista["BX"] = 'Caja' ;
    opciones_tipo_medida_lista["CT"] = 'Cartones' ;
    opciones_tipo_medida_lista["CMK"] = 'Centimetro Cuadrado' ;
    opciones_tipo_medida_lista["CMQ"] = 'Centimetro Cubico' ;
    opciones_tipo_medida_lista["CMT"] = 'Centimetro Lineal' ;
    opciones_tipo_medida_lista["CEN"] = 'Ciento de Unidades' ;
    opciones_tipo_medida_lista["CY"] = 'Cilindro' ;
    opciones_tipo_medida_lista["CJ"] = 'Conos' ;
    opciones_tipo_medida_lista["DZN"] = 'Docena' ;
    opciones_tipo_medida_lista["DZP"] = 'Docena por 10**6' ;
    opciones_tipo_medida_lista["BE"] = 'Fardo' ;
    opciones_tipo_medida_lista["GLI"] = 'Galon Inglés (4,545956L)' ;
    opciones_tipo_medida_lista["GRM"] = 'Gramo' ;
    opciones_tipo_medida_lista["GRO"] = 'Gruesa' ;
    opciones_tipo_medida_lista["HLT"] = 'Hectolitro' ;
    opciones_tipo_medida_lista["LEF"] = 'Hoja' ;
    opciones_tipo_medida_lista["SET"] = 'Juego' ;
    opciones_tipo_medida_lista["KGM"] = 'Kilogramo' ;
    opciones_tipo_medida_lista["KTM"] = 'Kilometro' ;
    opciones_tipo_medida_lista["KWH"] = 'Kilovatio Hora' ;
    opciones_tipo_medida_lista["KT"] = 'Kit' ;
    opciones_tipo_medida_lista["CA"] = 'Latas' ;
    opciones_tipo_medida_lista["LBR"] = 'Libras' ;
    opciones_tipo_medida_lista["LTR"] = 'Litro' ;
    opciones_tipo_medida_lista["MWH"] = 'Megawatt Hora' ;
    opciones_tipo_medida_lista["MTR"] = 'Metro' ;
    opciones_tipo_medida_lista["MTK"] = 'Metro Cuadrado' ;
    opciones_tipo_medida_lista["MTQ"] = 'Metro Cúbico' ;
    opciones_tipo_medida_lista["MGM"] = 'Miligramos' ;
    opciones_tipo_medida_lista["MLT"] = 'Mililitro' ;
    opciones_tipo_medida_lista["MMT"] = 'Milimetro' ;
    opciones_tipo_medida_lista["MMK"] = 'Milimetro Cuadrado' ;
    opciones_tipo_medida_lista["MMQ"] = 'Milimetro Cúbico' ;
    opciones_tipo_medida_lista["MLL"] = 'Millares' ;
    opciones_tipo_medida_lista["UM"] = 'Millón de Unidades' ;
    opciones_tipo_medida_lista["ONZ"] = 'Onzas' ;
    opciones_tipo_medida_lista["PF"] = 'Paletas' ;
    opciones_tipo_medida_lista["PK"] = 'Paquete' ;
    opciones_tipo_medida_lista["PR"] = 'Par' ;
    opciones_tipo_medida_lista["FOT"] = 'Pies' ;
    opciones_tipo_medida_lista["FTK"] = 'Pies Cuadrados' ;
    opciones_tipo_medida_lista["FTQ"] = 'Pies Cúbicos' ;
    opciones_tipo_medida_lista["C62"] = 'Piezas' ;
    opciones_tipo_medida_lista["PG"] = 'Placas' ;
    opciones_tipo_medida_lista["ST"] = 'Pliego' ;
    opciones_tipo_medida_lista["INH"] = 'Pulgadas' ;
    opciones_tipo_medida_lista["RM"] = 'Resma' ;
    opciones_tipo_medida_lista["DR"] = 'Tambor' ;
    opciones_tipo_medida_lista["STN"] = 'Tonelada Corta' ;
    opciones_tipo_medida_lista["LTN"] = 'Tonelada Larga' ;
    opciones_tipo_medida_lista["TNE"] = 'Toneladas' ;
    opciones_tipo_medida_lista["TU"] = 'Tubos' ;
    opciones_tipo_medida_lista["GLL"] = 'US Galón (3.7843 L)' ;
    opciones_tipo_medida_lista["YRD"] = 'Yarda' ;
    opciones_tipo_medida_lista["YDK"] = 'Yarda Cuadrada' ;
*/

    let codigos_medidas = [
        "NIU",
        "ZZ",
        "4A",
        "BJ",
        "BLL",
        "BG",
        "BO",
        "BX",
        "CT",
        "CMK",
        "CMQ",
        "CMT",
        "CEN",
        "CY",
        "CJ",
        "DZN",
        "DZP",
        "BE",
        "GLI",
        "GRM",
        "GRO",
        "HLT",
        "LEF",
        "SET",
        "KGM",
        "KTM",
        "KWH",
        "KT",
        "CA",
        "LBR",
        "LTR",
        "MWH",
        "MTR",
        "MTK",
        "MTQ",
        "MGM",
        "MLT",
        "MMT",
        "MMK",
        "MMQ",
        "MLL",
        "UM",
        "ONZ",
        "PF",
        "PK",
        "PR",
        "FOT",
        "FTK",
        "FTQ",
        "C62",
        "PG",
        "ST",
        "INH",
        "RM",
        "DR",
        "STN",
        "LTN",
        "TNE",
        "TU",
        "GLL",
        "YRD",
        "YDK",
    ];

    const nombres_medidas = [
        'Unidad (Bienes)',
        'Unidad (Servicios)',
        'Bobinas',
        'Balde',
        'Barriles',
        'Bolsa',
        'Botellas',
        'Caja',
        'Cartones',
        'Centimetro Cuadrado',
        'Centimetro Cubico',
        'Centimetro Lineal',
        'Ciento de Unidades',
        'Cilindro',
        'Conos',
        'Docena',
        'Docena por 10**6',
        'Fardo',
        'Galon Inglés (4,545956L)',
        'Gramo',
        'Gruesa',
        'Hectolitro',
        'Hoja',
        'Juego',
        'Kilogramo',
        'Kilometro',
        'Kilovatio Hora',
        'Kit',
        'Latas',
        'Libras',
        'Litro',
        'Megawatt Hora',
        'Metro',
        'Metro Cuadrado',
        'Metro Cúbico',
        'Miligramos',
        'Mililitro',
        'Milimetro',
        'Milimetro Cuadrado',
        'Milimetro Cúbico',
        'Millares',
        'Millón de Unidades',
        'Onzas',
        'Paletas',
        'Paquete',
        'Par',
        'Pies',
        'Pies Cuadrados',
        'Pies Cúbicos',
        'Piezas',
        'Placas',
        'Pliego',
        'Pulgadas',
        'Resma',
        'Tambor',
        'Tonelada Corta',
        'Tonelada Larga',
        'Toneladas',
        'Tubos',
        'US Galón (3.7843 L)',
        'Yarda',
        'Yarda Cuadrada',
    ];

    console.log("--------------------------------");
    console.log("CARGANDO DATOS DESDE CSV");
    console.log("--------------------------------");
    console.log(req.body.listaSucursales);
    let JsonSucursal = JSON.parse(req.body.listaSucursales);
    console.log(JsonSucursal);
    let arraySucursal = [];
    for (let i = 1; i < JsonSucursal.length; i++){
      arraySucursal[JsonSucursal[i].nombreSucursal.toUpperCase()] = JsonSucursal[i].codSucursal;
    }


    // copeara el archivo al servidor y de allí subira la información eliminando el archivo al final de subir la data
    const fs = require('fs');

    let EDFile = req.files.file_data;
    EDFile.mv('./src/data/newFile.csv', err => {
      if (err){
        res.send(err);
      }else{
        // si copio el archivo al servidor correctamente
        // leeremos el archivo y cargaremos en la base de datos

        const filePath = './src/data/newFile.csv';

        const csv = require('csv-parser');
        const fs = require('fs');

        const  data = [];
        fs.createReadStream(filePath)
            .pipe(csv({ separator: ';' }))
            .on('data', (row) => {
              data.push(row);
            }) // SE CONFIGURO Y ABRIO EL ARCHIVO CSV, EL CUAL SERA CONVERTIDO A JSON
            .on('end', () => {
              console.log('CSV file successfully processed');
              res.send(data);
              console.log(data);
              data.forEach((e, i) => {
                var nuevoProducto = new Producto(e);
                nuevoProducto.sucursal = arraySucursal[nuevoProducto.sucursal.toUpperCase()];

                let encontro_codigo = false;
                for (let i = 0; i < nombres_medidas.length; i++){
                    if (nombres_medidas[i].toUpperCase() === nuevoProducto.codUnidadMedida.toUpperCase()){
                        nuevoProducto.codUnidadMedida = codigos_medidas[i];
                        encontro_codigo = true;
                    }
                }

                if (!encontro_codigo)
                    nuevoProducto.codUnidadMedida = codigos_medidas[0];

                // USANDO EL MODELO PRODUCTO SE CREA EL NUEVO PRODUCTO EN LA BASE DE DATOS
                Producto.createProducto(req.body.dataToken.cadenaDeConexion, nuevoProducto, function (err, producto) {
                  if (err)
                    res.send(err);
                  else
                    console.log(producto);
                })
              }) ;
            });
      }
    });
  };

exports.update_data_csv = function (req, res) {
    let opciones_tipo_medida_lista = [];
    opciones_tipo_medida_lista["NIU"] = 'Unidad (Bienes)' ;
    opciones_tipo_medida_lista["ZZ"] = 'Unidad (Servicios)' ;
    opciones_tipo_medida_lista["4A"] = 'Bobinas' ;
    opciones_tipo_medida_lista["BJ"] = 'Balde' ;
    opciones_tipo_medida_lista["BLL"] = 'Barriles' ;
    opciones_tipo_medida_lista["BG"] = 'Bolsa' ;
    opciones_tipo_medida_lista["BO"] = 'Botellas' ;
    opciones_tipo_medida_lista["BX"] = 'Caja' ;
    opciones_tipo_medida_lista["CT"] = 'Cartones' ;
    opciones_tipo_medida_lista["CMK"] = 'Centimetro Cuadrado' ;
    opciones_tipo_medida_lista["CMQ"] = 'Centimetro Cubico' ;
    opciones_tipo_medida_lista["CMT"] = 'Centimetro Lineal' ;
    opciones_tipo_medida_lista["CEN"] = 'Ciento de Unidades' ;
    opciones_tipo_medida_lista["CY"] = 'Cilindro' ;
    opciones_tipo_medida_lista["CJ"] = 'Conos' ;
    opciones_tipo_medida_lista["DZN"] = 'Docena' ;
    opciones_tipo_medida_lista["DZP"] = 'Docena por 10**6' ;
    opciones_tipo_medida_lista["BE"] = 'Fardo' ;
    opciones_tipo_medida_lista["GLI"] = 'Galon Inglés (4,545956L)' ;
    opciones_tipo_medida_lista["GRM"] = 'Gramo' ;
    opciones_tipo_medida_lista["GRO"] = 'Gruesa' ;
    opciones_tipo_medida_lista["HLT"] = 'Hectolitro' ;
    opciones_tipo_medida_lista["LEF"] = 'Hoja' ;
    opciones_tipo_medida_lista["SET"] = 'Juego' ;
    opciones_tipo_medida_lista["KGM"] = 'Kilogramo' ;
    opciones_tipo_medida_lista["KTM"] = 'Kilometro' ;
    opciones_tipo_medida_lista["KWH"] = 'Kilovatio Hora' ;
    opciones_tipo_medida_lista["KT"] = 'Kit' ;
    opciones_tipo_medida_lista["CA"] = 'Latas' ;
    opciones_tipo_medida_lista["LBR"] = 'Libras' ;
    opciones_tipo_medida_lista["LTR"] = 'Litro' ;
    opciones_tipo_medida_lista["MWH"] = 'Megawatt Hora' ;
    opciones_tipo_medida_lista["MTR"] = 'Metro' ;
    opciones_tipo_medida_lista["MTK"] = 'Metro Cuadrado' ;
    opciones_tipo_medida_lista["MTQ"] = 'Metro Cúbico' ;
    opciones_tipo_medida_lista["MGM"] = 'Miligramos' ;
    opciones_tipo_medida_lista["MLT"] = 'Mililitro' ;
    opciones_tipo_medida_lista["MMT"] = 'Milimetro' ;
    opciones_tipo_medida_lista["MMK"] = 'Milimetro Cuadrado' ;
    opciones_tipo_medida_lista["MMQ"] = 'Milimetro Cúbico' ;
    opciones_tipo_medida_lista["MLL"] = 'Millares' ;
    opciones_tipo_medida_lista["UM"] = 'Millón de Unidades' ;
    opciones_tipo_medida_lista["ONZ"] = 'Onzas' ;
    opciones_tipo_medida_lista["PF"] = 'Paletas' ;
    opciones_tipo_medida_lista["PK"] = 'Paquete' ;
    opciones_tipo_medida_lista["PR"] = 'Par' ;
    opciones_tipo_medida_lista["FOT"] = 'Pies' ;
    opciones_tipo_medida_lista["FTK"] = 'Pies Cuadrados' ;
    opciones_tipo_medida_lista["FTQ"] = 'Pies Cúbicos' ;
    opciones_tipo_medida_lista["C62"] = 'Piezas' ;
    opciones_tipo_medida_lista["PG"] = 'Placas' ;
    opciones_tipo_medida_lista["ST"] = 'Pliego' ;
    opciones_tipo_medida_lista["INH"] = 'Pulgadas' ;
    opciones_tipo_medida_lista["RM"] = 'Resma' ;
    opciones_tipo_medida_lista["DR"] = 'Tambor' ;
    opciones_tipo_medida_lista["STN"] = 'Tonelada Corta' ;
    opciones_tipo_medida_lista["LTN"] = 'Tonelada Larga' ;
    opciones_tipo_medida_lista["TNE"] = 'Toneladas' ;
    opciones_tipo_medida_lista["TU"] = 'Tubos' ;
    opciones_tipo_medida_lista["GLL"] = 'US Galón (3.7843 L)' ;
    opciones_tipo_medida_lista["YRD"] = 'Yarda' ;
    opciones_tipo_medida_lista["YDK"] = 'Yarda Cuadrada' ;

    console.log("--------------------------------");
    console.log("CARGANDO DATOS DESDE CSV PARA ACTUALIZAR");
    console.log("--------------------------------");


    // copeara el archivo al servidor y de allí subira la información eliminando el archivo al final de subir la data
    const fs = require('fs');

    let EDFile = req.files.file_data;
    EDFile.mv('./src/data/newFile.csv', err => {
        if (err){
            res.send(err);
        }else{
            // si copio el archivo al servidor correctamente
            // leeremos el archivo y cargaremos en la base de datos

            const filePath = './src/data/newFile.csv';

            const csv = require('csv-parser');
            const fs = require('fs');

            const  data = [];
            fs.createReadStream(filePath)
                .pipe(csv({ separator: ';' }))
                .on('data', (row) => {
                    data.push(row);
                }) // SE CONFIGURO Y ABRIO EL ARCHIVO CSV, EL CUAL SERA CONVERTIDO A JSON
                .on('end', () => {
                    console.log('CSV file successfully processed to upload');
                    res.send(data);
                    console.log(data);
                    data.forEach((elemento, i) => {
                        // USANDO EL MODELO PRODUCTO SE CREA EL NUEVO PRODUCTO EN LA BASE DE DATOS
                        Producto.updateProductoStock(req.body.dataToken.cadenaDeConexion, elemento, function (err, producto) {
                            if (err)
                                console.log(err);
                            else
                                console.log(producto);
                        })
                    }) ;
                });
        }
    });
};

exports.list_producto_sucursal = function (req, res) {
  Producto.getProductoSucursal(req.body.dataToken.cadenaDeConexion, req.params.sucursalId, function (err, productos) {
    if (err){
      res.send(err);
    }else{
      res.json(productos);
    }
  })
};

exports.toShowProducts = function(req, res){
    console.log("Obteniendo productos para imprimir...");
    Producto.getProductsToPrint(req.body.dataToken.cadenaDeConexion, req.params.idProvedor, function (err, productos) {
        if (err){
            res.send(err);
        }else{
            res.json(productos);
        }
    })
};

exports.exportar_excel = function (req, res) {
    console.log("Generando Excel desde Productos_Controller");
    Producto.getProductsToPrint(req.body.dataToken.cadenaDeConexion, req.params.idProvedor,
        function (err, listaProductos){
            if (err){
                res.send(err);
            }else {
                console.log("Unidades obtenidas... empezando a crear archivo excel");

                let cabeceras = ['ID PRODUCTO', 'DESCRIPCIÓN', 'STOCK', 'PRECIO PRODUCTO', 'COSTO VENTA', 'ID SUCURSAL', 'NUM SERIE', 'COD UNIDAD MEDIDA'];

                let excelFile = require('excel4node'); // variable del archivo excel
                // Create a new instance of a Workbook class
                let workbook = new excelFile.Workbook();
                // Add Worksheets to the workbook
                let worksheet = workbook.addWorksheet('Hoja 1');

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

                const FILAS_OFFSET = 5;

                // Ancho de columnas
                worksheet.column(1).setWidth(15);
                worksheet.column(2).setWidth(60);
                worksheet.column(3).setWidth(10);
                worksheet.column(4).setWidth(20);
                worksheet.column(5).setWidth(20);
                worksheet.column(6).setWidth(15);
                worksheet.column(7).setWidth(25);
                worksheet.column(8).setWidth(22);

                worksheet.cell(2,2).string("LISTA DE PRODUCTOS").style({font: {size: 20}});
                worksheet.cell(3,2).string("Productos con stock mayor a " + req.params.unidadesMinimas + " unidades.").style({font: {size: 11}});



                for (let i = 0; i < cabeceras.length; i++){
                    worksheet.cell(FILAS_OFFSET, i + 1).string(cabeceras[i]).style(estiloCabecera);
                }

                for (let i = 0; i < listaProductos.length; i++){
                    worksheet.cell(FILAS_OFFSET + 1 + i, 1).number(listaProductos[i].idProducto).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
                    worksheet.cell(FILAS_OFFSET + 1 + i, 2).string(listaProductos[i].nombreProducto).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
                    worksheet.cell(FILAS_OFFSET + 1 + i, 3).number(listaProductos[i].stockProducto).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
                    worksheet.cell(FILAS_OFFSET + 1 + i, 4).number(listaProductos[i].precioProducto).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
                    worksheet.cell(FILAS_OFFSET + 1 + i, 5).number(listaProductos[i].costVenta).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
                    worksheet.cell(FILAS_OFFSET + 1 + i, 6).number(listaProductos[i].sucursal).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
                    worksheet.cell(FILAS_OFFSET + 1 + i, 7).string(listaProductos[i].serie).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
                    worksheet.cell(FILAS_OFFSET + 1 + i, 8).string(listaProductos[i].codUnidadMedida).style(i % 2 === 0? estiloFilaPar: estiloFilaImpar);
                }

                const file_name = "listaproductos.xlsx";
                const rutaBase = require('path').join(__dirname, '../../src/public/files/') + file_name;
                workbook.write(rutaBase);
                console.log("RUTA BASE");
                console.log(rutaBase);
                //res.sendFile('listaproductos.xlsx', {root: require('path').join(__dirname, '../../')});
                res.download(rutaBase);
            }
        });
};

exports.crearPlantilla = (req, res) => {
    if (req.params.tipo === '1'){
        console.log("CREAR PLANTILLA IMPORTAR DATOS");
        console.log(req.params);
        const filename = 'plantillaImportar.csv';
        const path_base = require('path').join(__dirname, '../../' + filename);

        const createCsvWriter = require('csv-writer').createObjectCsvWriter;
        const csvWriter = createCsvWriter({
            fieldDelimiter: ';',
            path: path_base,
            header: [
                {id: 'id', title: 'id'},
                {id: 'nombre', title: 'nombreProducto'},
                {id: 'stock', title: 'stockProducto'},
                {id: 'codUnidadMedida', title: 'codUnidadMedida'},
                {id: 'precio', title: 'precioProducto'},
                {id: 'costo', title: 'costVenta'},
                {id: 'sucursal', title: 'sucursal'},
                {id: 'serie', title: 'serie'},
            ]
        });

        const records = [
            {
                id: '1',
                nombre: 'Producto 1',
                stock: '12',
                codUnidadMedida: 'Unidad (Bienes)',
                precio: '123.21',
                costo: '150',
                sucursal: 'PRINCIPAL',
                serie: '87654323456',
            },
            {
                id: '2',
                nombre: 'Producto 2',
                stock: '9',
                codUnidadMedida: 'Pliego',
                precio: '12.21',
                costo: '15',
                sucursal: 'SECUNDARIO',
                serie: '999999999999',
            },
            {
                id: '3',
                nombre: 'Producto 3',
                stock: '45',
                codUnidadMedida: 'Millón de Unidades',
                precio: '122',
                costo: '130',
                sucursal: 'PRINCIPAL',
                serie: '5656565656',
            },

        ];

        csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
                console.log('...Done');
                res.download(path_base);
            });
    }else if (req.params.tipo === '2'){
        console.log("CREAR PLANTILLA IMPORTAR DATOS");
        console.log(req.params);
        const filename = 'plantillaImportar.csv';
        const path_base = require('path').join(__dirname, '../../' + filename);

        const createCsvWriter = require('csv-writer').createObjectCsvWriter;
        const csvWriter = createCsvWriter({
            fieldDelimiter: ';',
            path: path_base,
            header: [
                {id: 'aux', title: 'aux'},
                {id: 'idProducto', title: 'id'},
                {id: 'newStock', title: 'newStock'},
            ]
        });

        const records = [
            {
                aux: '#',
                idProducto: '1',
                newStock: '34',
            },
            {
                aux: 'polera',
                idProducto: '22',
                newStock: '22',
            },
            {
                aux: 'camisa azul M',
                idProducto: '45',
                newStock: '20',
            },
        ];

        csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
                console.log('...Done');
                res.download(path_base);
            });
    }
};

exports.getByFilter = function (req, res) {
    Producto.getProductosByCondition(req.body.dataToken.cadenaDeConexion, req.params.idSucursal, req.params.nomColumna, req.params.valColumna, function (err, productos) {
        if (err){
            res.send(err);
        }else{
            res.json(productos);
        }
    });
}

exports.crearPdf = function (req, res) {
    const pdf = require('html-pdf');
    const pdfTemplate = require('../templatePdf/tablaProductos');

    Producto.getProductsToPrint(req.body.dataToken.cadenaDeConexion, '-1', (err, productos) => {
        console.log(productos);
        pdf.create(pdfTemplate({data: productos}),{}).toFile('Productos.pdf', (err) => {
            if (err){
                console.log("Error al generar PDF");
                res.send("No se pudo");
            }else{
                console.log("Generado exitosamente");
                res.send("Se genero ^_^ ");
            }
        });
    });

};