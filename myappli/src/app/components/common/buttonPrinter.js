import React from 'react';
import PropTypes from 'prop-types';

const ButtonPrinter = (props) => (
    <button
        className={"btn " + props.classButton}
        onClick={() => {
            const inicio = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Gestión de Cuentas</title>

    <!--boostrap css-->
    <link rel="stylesheet" href="./bootstrap-4.3.1-dist/css/bootstrap.min.css" crossorigin="anonymous">

</head>
<body>`;
            const fin = `    <!--script-->
        <!-- Font Awesome -->
        <link rel="stylesheet" href="./fontawesome-free-5.8.1-web/css/all.css" crossorigin="anonymous">
        
         <!--boostrap -->
         <script src="./bootstrap-4.3.1-dist/js/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
         <script src="./bootstrap-4.3.1-dist/js/popper.min.js" crossorigin="anonymous"></script>
         <script src="./bootstrap-4.3.1-dist/js/bootstrap.min.js" crossorigin="anonymous"></script>
         <script src="./pdf/jspdf.debug.js"></script>

       <!--boostrap icons-->
       <link rel="stylesheet" href="./fontawesome-free-5.8.1-web/css/all.css" crossorigin="anonymous">

        <script src="bundle.js"></script>

</body>
</html>`;
            var ventana = window.open('', 'PRINT', 'height=800,width=800');
            ventana.document.write(inicio + document.getElementById(props.elemento).innerHTML + fin);
            ventana.document.close();
            ventana.focus();
            ventana.onload = function() {
                ventana.print();
                //ventana.close();
            };
            return true;
        }}
    >
        Imprimir
    </button>
);

ButtonPrinter.propTypes = {
    elemento: PropTypes.string.isRequired,
};

export default ButtonPrinter;