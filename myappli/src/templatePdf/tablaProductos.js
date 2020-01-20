module.exports = ({ data }) => {
    console.log("--------------- FUNCION ------------------");
    console.log(data);
    const styles = `
.title{
    text-align: center;
}
table.blueTable {
  border: 1px solid #1C6EA4;
  background-color: #EEEEEE;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}
table.blueTable td, table.blueTable th {
  border: 2px solid #AAAAAA;
  padding: 5px 10px;
}
table.blueTable tbody td {
  font-size: 13px;
}
table.blueTable tr:nth-child(even) {
  background: #D0E4F5;
}
table.blueTable thead {
  background: #1C6EA4;
  background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  border-bottom: 2px solid #444444;
}
table.blueTable thead th {
  font-size: 15px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
  border-left: 2px solid #D0E4F5;
}
table.blueTable thead th:first-child {
  border-left: none;
}

table.blueTable tfoot td {
  font-size: 16px;
}
table.blueTable tfoot .links {
  text-align: right;
}
table.blueTable tfoot .links a{
  display: inline-block;
  background: #1C6EA4;
  color: #FFFFFF;
  padding: 2px 8px;
  border-radius: 5px;
}
    `;

    let registrosTabla = '';

    // idProducto, nombreProducto, stockProducto, precioProducto, costVenta, sucursal, serie, codUnidadMedida
    for (let i = 0; i < data.length; i++){
        registrosTabla += '<tr>';

        registrosTabla += '<td>' + data[i].idProducto + '</td>';
        registrosTabla += '<td>' + data[i].nombreProducto + '</td>';
        registrosTabla += '<td>' + data[i].stockProducto + '</td>';
        registrosTabla += '<td>' + data[i].precioProducto + '</td>';
        registrosTabla += '<td>' + data[i].costVenta + '</td>';
        registrosTabla += '<td>' + data[i].sucursal + '</td>';
        registrosTabla += '<td>' + data[i].serie + '</td>';
        registrosTabla += '<td>' + data[i].codUnidadMedida + '</td>';

        registrosTabla += '</tr>';
    }

    return `
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Lista de Productos</title>
<style>
    ${styles}
</style>
<body>
    <div class="title"><h2>Lista de Productos</h2></div>
    <hr>
    <div class="tabla">
        <table class="blueTable">
            <thead>
                <tr>
                    <th>ID Producto</th>
                    <th>Descripción</th>
                    <th>Stock</th>
                    <th>Precio Venta</th>
                    <th>Precio Costo</th>
                    <th>Sucursal</th>
                    <th>Serie</th>
                    <th>Cod. Unidad de Medida</th>
                </tr>
            </thead>
            <tbody>
                ${registrosTabla}
            </tbody>
         </table>
    </div>
</body>
</head>
</html>
    `;
};