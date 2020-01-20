-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-12-2019 a las 01:03:51
-- Versión del servidor: 10.1.40-MariaDB
-- Versión de PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `concada`
--
CREATE DATABASE IF NOT EXISTS `concada` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `concada`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contadores`
--

CREATE TABLE `contadores` (
  `id_contador` int(11) NOT NULL,
  `codigo` char(10) NOT NULL,
  `valor1` char(10) NOT NULL,
  `valor2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `contadores`
--

INSERT INTO `contadores` (`id_contador`, `codigo`, `valor1`, `valor2`) VALUES
(1, 'boleta', 'E001', 0),
(2, 'factura', 'F001', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_inventarios`
--

CREATE TABLE `detalle_inventarios` (
  `idDetalle` int(11) NOT NULL,
  `idIngreso` int(11) DEFAULT NULL,
  `ctdUnidadItem` int(11) DEFAULT NULL,
  `codUnidadMedida` varchar(3) DEFAULT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `desItem` varchar(500) DEFAULT NULL,
  `tipoAfecto` tinyint(3) UNSIGNED DEFAULT NULL,
  `mtoPrecioUnitario` float DEFAULT NULL,
  `mtoValorUnitario` float DEFAULT NULL,
  `mtoValorVenta` float DEFAULT NULL,
  `igv` float DEFAULT NULL,
  `isc` float DEFAULT NULL,
  `mtoSumTributos` float DEFAULT NULL,
  `mtoVentaTotal` float DEFAULT NULL,
  `mtoDsctoItem` float DEFAULT NULL,
  `costVenta` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `detalle_inventarios`
--

INSERT INTO `detalle_inventarios` (`idDetalle`, `idIngreso`, `ctdUnidadItem`, `codUnidadMedida`, `idProducto`, `desItem`, `tipoAfecto`, `mtoPrecioUnitario`, `mtoValorUnitario`, `mtoValorVenta`, `igv`, `isc`, `mtoSumTributos`, `mtoVentaTotal`, `mtoDsctoItem`, `costVenta`) VALUES
(1, 1, 5, 'NIU', 1, 'Producto 1', 0, 2, 1.69, 8.47, 1.53, 0, 1.53, 10, 0, '5'),
(2, 2, 2, 'UM', 3, 'Producto 3', 0, 2, 1.69, 3.39, 0.61, 0, 0.61, 4, 0, '2'),
(3, 2, 1, 'NIU', 4, 'PRODUCTO 4', 0, 2, 1.69, 1.69, 0.31, 0, 0.31, 2, 0, '1'),
(4, 5, 15, 'ST', 2, 'Producto 2', 0, 2, 1.69, 25.42, 4.58, 0, 4.58, 30, 0, '15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE `grupos` (
  `idGrupo` int(11) NOT NULL,
  `nombreGrupo` char(100) NOT NULL,
  `orden` int(2) NOT NULL,
  `fechaCreacion` date NOT NULL,
  `habilitado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `grupos`
--

INSERT INTO `grupos` (`idGrupo`, `nombreGrupo`, `orden`, `fechaCreacion`, `habilitado`) VALUES
(1, 'Operaciones', 1, '2019-12-19', 1),
(2, 'Existencias', 2, '2019-12-19', 1),
(3, 'Parámetros', 4, '2019-12-19', 1),
(4, 'Administrador de Usuarios', 5, '2019-12-19', 1),
(5, 'Estados Financieros', 3, '2019-12-19', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_clientes`
--

CREATE TABLE `info_clientes` (
  `idCliente` int(11) NOT NULL,
  `tipDocUsuario` char(1) DEFAULT NULL,
  `numDocUsuario` varchar(15) DEFAULT NULL,
  `desDireccionCliente` text,
  `codPaisCliente` varchar(2) DEFAULT NULL,
  `codUbigeoCliente` varchar(6) DEFAULT NULL,
  `razSocial` text,
  `telefonoCliente` varchar(20) DEFAULT NULL,
  `correoCliente` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `info_clientes`
--

INSERT INTO `info_clientes` (`idCliente`, `tipDocUsuario`, `numDocUsuario`, `desDireccionCliente`, `codPaisCliente`, `codUbigeoCliente`, `razSocial`, `telefonoCliente`, `correoCliente`) VALUES
(1, '1', '72378629', 'CALLE TAL 564', '', '-', 'ARMAMDO HINOJOSA CCAMA', '', '-');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_fuente`
--

CREATE TABLE `info_fuente` (
  `codFuente` int(11) NOT NULL,
  `fuente` varchar(30) DEFAULT NULL,
  `saldo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `info_fuente`
--

INSERT INTO `info_fuente` (`codFuente`, `fuente`, `saldo`) VALUES
(1, '-', 'NULL'),
(2, 'CAJA CHICA', '231'),
(3, 'CTA CTE ', '175');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_grupopartidas`
--

CREATE TABLE `info_grupopartidas` (
  `idGrupoPartida` int(11) NOT NULL,
  `nombreGrupo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `info_grupopartidas`
--

INSERT INTO `info_grupopartidas` (`idGrupoPartida`, `nombreGrupo`) VALUES
(1, ''),
(2, 'INGRESOS'),
(3, 'EGRESOS'),
(4, 'ACTIVOS'),
(5, 'PASIVOS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_ingresos`
--

CREATE TABLE `info_ingresos` (
  `idIngreso` int(11) NOT NULL,
  `codSucursal` int(11) DEFAULT NULL,
  `tipOperacion` varchar(10) DEFAULT NULL,
  `codMes` int(11) DEFAULT NULL,
  `codFuente` int(11) DEFAULT NULL,
  `idPartida` int(11) DEFAULT NULL,
  `horEmision` time DEFAULT NULL,
  `fecEmision` date DEFAULT NULL,
  `fecVencimiento` date DEFAULT NULL,
  `tipoComprobante` int(11) DEFAULT NULL,
  `numSerieComprobante` varchar(10) DEFAULT NULL,
  `detalleIngreso` varchar(300) DEFAULT NULL,
  `numComprobante` int(11) UNSIGNED DEFAULT NULL,
  `tipMoneda` char(3) DEFAULT NULL,
  `aCreditoDias` int(11) DEFAULT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `sumTotTributos` float DEFAULT NULL,
  `sumTotValVenta` float DEFAULT NULL,
  `sumPrecioVenta` float DEFAULT NULL,
  `sumDescTotal` float DEFAULT NULL,
  `sumOtrosCargos` float DEFAULT NULL,
  `aCuenta` float DEFAULT NULL,
  `costVenta` float DEFAULT NULL,
  `costServicio` float DEFAULT NULL,
  `utilidad` float DEFAULT NULL,
  `movimiento` int(11) DEFAULT NULL COMMENT 'campo para indentificar si es ingreso o egreso',
  `dua_dsi` timestamp NULL DEFAULT NULL,
  `editable` int(11) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `codOperacion` int(11) DEFAULT NULL,
  `codMotivoNC` varchar(11) DEFAULT NULL,
  `descMotivoNC` varchar(300) DEFAULT NULL,
  `tipoComprobanteNC` int(11) DEFAULT NULL,
  `numSerieComprobanteNC` varchar(10) DEFAULT NULL,
  `numComprobanteNC` int(11) UNSIGNED ZEROFILL DEFAULT NULL,
  `otroTipoComprobante` varchar(15) DEFAULT NULL,
  `otroTipoComprobanteNC` varchar(15) DEFAULT NULL,
  `idUsuarioIngreso` int(11) DEFAULT NULL,
  `campo1i` char(20) DEFAULT NULL,
  `campo2i` char(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `info_ingresos`
--

INSERT INTO `info_ingresos` (`idIngreso`, `codSucursal`, `tipOperacion`, `codMes`, `codFuente`, `idPartida`, `horEmision`, `fecEmision`, `fecVencimiento`, `tipoComprobante`, `numSerieComprobante`, `detalleIngreso`, `numComprobante`, `tipMoneda`, `aCreditoDias`, `idCliente`, `sumTotTributos`, `sumTotValVenta`, `sumPrecioVenta`, `sumDescTotal`, `sumOtrosCargos`, `aCuenta`, `costVenta`, `costServicio`, `utilidad`, `movimiento`, `dua_dsi`, `editable`, `estado`, `codOperacion`, `codMotivoNC`, `descMotivoNC`, `tipoComprobanteNC`, `numSerieComprobanteNC`, `numComprobanteNC`, `otroTipoComprobante`, `otroTipoComprobanteNC`, `idUsuarioIngreso`, `campo1i`, `campo2i`) VALUES
(1, 2, 'null', 201912, 2, 2, '21:49:56', '2019-12-14', '2019-12-14', 4, NULL, '', NULL, 'PEN', 0, 0, 1.53, 8.47, 10, 0, 0, 10, 5, 0, 0, 1, NULL, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 2, 'null', 201912, 2, 2, '21:51:09', '2019-12-14', '2019-12-14', 4, NULL, '', NULL, 'PEN', 0, 0, 0.92, 5.08, 6, 0, 0, 6, 3, 0, 0, 1, NULL, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 2, 'null', 201912, 2, 3, '21:51:52', '2019-12-14', '2019-12-14', 4, NULL, 'INTERNET', NULL, 'PEN', 0, 0, 0, 0, 15, 0, 0, 15, 0, 0, 0, 0, NULL, 1, 1, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 2, 'null', 201912, 3, 3, '21:53:15', '2019-12-14', '2019-12-14', 4, NULL, 'CELULAR', NULL, 'PEN', 0, 0, 0, 0, 25, 0, 0, 25, 0, 0, 0, 0, NULL, 1, 1, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 2, 'null', 201912, 2, 2, '21:55:06', '2019-12-14', '2019-12-14', 4, NULL, '', NULL, 'PEN', 0, 0, 4.58, 25.42, 30, 0, 0, 0, 15, 30, 0, 1, NULL, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 2, 'null', 201912, 2, 2, '21:58:35', '2019-12-14', '2019-12-14', 4, NULL, 'PAGO DEUDA X', NULL, 'PEN', 0, 0, 0, 0, 30, 0, 0, 30, 0, 0, 0, 1, NULL, 1, 1, 5, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_negocio`
--

CREATE TABLE `info_negocio` (
  `id_infonegocio` int(11) NOT NULL,
  `ruc` varchar(11) NOT NULL,
  `razon_social` varchar(150) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidosp` varchar(100) NOT NULL,
  `apellidosm` varchar(100) NOT NULL,
  `nombre_comercial` varchar(150) NOT NULL,
  `usuariosol` char(20) NOT NULL,
  `clavesol` varchar(300) NOT NULL,
  `direccion` varchar(300) NOT NULL,
  `ubigeo` char(20) NOT NULL,
  `urbanizacion` varchar(100) NOT NULL,
  `distrito` varchar(100) NOT NULL,
  `provincia` varchar(100) NOT NULL,
  `departamento` varchar(100) NOT NULL,
  `rubros` varchar(300) NOT NULL,
  `contacto` varchar(100) NOT NULL,
  `imagenEmpresa` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `info_negocio`
--

INSERT INTO `info_negocio` (`id_infonegocio`, `ruc`, `razon_social`, `nombres`, `apellidosp`, `apellidosm`, `nombre_comercial`, `usuariosol`, `clavesol`, `direccion`, `ubigeo`, `urbanizacion`, `distrito`, `provincia`, `departamento`, `rubros`, `contacto`, `imagenEmpresa`) VALUES
(1, '20604229601', 'CONSTRUCTORA INMOBILIARIA CONSORCIO A & M E.I.R.L.', '-', '-', '-', 'CONSORCIO A & M E.I.R.L.', '.', '.', 'AV. ANGAMOS NRO. 120 URB. JORGE CHAVEZ AREQUIPA - AREQUIPA - PAUCARPATA', '.', '.', 'PAUCARPATA', 'AREQUIPA ', 'AREQUIPA ', 'LENTES Y MONTURAS', '978880277', 'http://localhost:3000/img/logoprecise.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_partidas`
--

CREATE TABLE `info_partidas` (
  `idPartida` int(11) NOT NULL,
  `nombrePartida` varchar(50) DEFAULT NULL,
  `idGrupo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `info_partidas`
--

INSERT INTO `info_partidas` (`idPartida`, `nombrePartida`, `idGrupo`) VALUES
(1, '', 1),
(2, 'VENTAS', 2),
(3, 'SERVICIOS', 3),
(4, 'MOVIMIENTO DE EFECTIVO', 4),
(5, 'CTAS POR COBRAR', 4),
(6, 'MERCADERIA', 4),
(7, 'CTAS POR PAGAR', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_productos`
--

CREATE TABLE `info_productos` (
  `idProducto` int(11) NOT NULL,
  `nombreProducto` varchar(100) DEFAULT NULL,
  `stockProducto` int(11) DEFAULT NULL,
  `precioProducto` float DEFAULT NULL,
  `costVenta` double DEFAULT NULL,
  `sucursal` int(11) DEFAULT NULL,
  `serie` varchar(45) DEFAULT NULL,
  `codUnidadMedida` varchar(5) DEFAULT NULL,
  `codPartida` int(11) DEFAULT NULL,
  `fechaVencimiento` date DEFAULT NULL,
  `idUsuarioRegistroP` int(11) DEFAULT NULL,
  `campo1p` char(20) NOT NULL,
  `campo2p` char(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `info_productos`
--

INSERT INTO `info_productos` (`idProducto`, `nombreProducto`, `stockProducto`, `precioProducto`, `costVenta`, `sucursal`, `serie`, `codUnidadMedida`, `codPartida`, `fechaVencimiento`, `idUsuarioRegistroP`, `campo1p`, `campo2p`) VALUES
(1, 'Producto 1', 99978, 2, 1, 2, '87654323456', 'NIU', NULL, NULL, NULL, '', ''),
(2, 'Producto 2', 9983, 2, 1, 2, '999999999999', 'ST', NULL, NULL, NULL, '', ''),
(3, 'Producto 3', 9994, 2, 1, 2, '5656565656', 'UM', NULL, NULL, NULL, '', ''),
(4, 'PRODUCTO 4', 226, 2, 1, 3, '0', 'NIU', 2, '2019-12-10', NULL, '', ''),
(5, 'PRODUCTO CON NOMBRE LARGO', 15, 2, 1, 2, '', 'BX', 2, '2019-01-01', NULL, '', ''),
(6, 'OTRO', 99999, 11, 10, 2, '', '4A', 2, '2019-01-01', NULL, '', ''),
(7, 'CAÑERIA', 10, 15, 10, 2, '', 'BLL', 2, '2019-01-01', NULL, '', ''),
(8, 'cañeria 34', 12, 123.21, 150, 2, '87654323456', 'NIU', NULL, NULL, NULL, '', ''),
(9, 'termometro 100C°', 0, 10, 0, NULL, NULL, 'NIU', NULL, NULL, NULL, '', ''),
(10, 'NUEVO PRODUCTO V3', 9999, 15, 10, 3, '', 'BO', 2, '2019-12-31', NULL, '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_sucursales`
--

CREATE TABLE `info_sucursales` (
  `codSucursal` int(11) UNSIGNED NOT NULL,
  `nombreSucursal` varchar(20) DEFAULT NULL,
  `direccionSucursal` varchar(300) DEFAULT NULL,
  `distrito` varchar(30) DEFAULT NULL,
  `provincia` varchar(30) DEFAULT NULL,
  `departamento` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `info_sucursales`
--

INSERT INTO `info_sucursales` (`codSucursal`, `nombreSucursal`, `direccionSucursal`, `distrito`, `provincia`, `departamento`) VALUES
(1, 'SELECCIONE SUCURSAL', '--', '--', '--', '--'),
(2, 'PRINCIPAL', '.', '.', '.', '.'),
(3, 'SUCURSAL', '.', '-', '-', '-');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiles`
--

CREATE TABLE `perfiles` (
  `idPerfil` int(11) NOT NULL,
  `nombrePerfil` char(30) NOT NULL,
  `fechaCreacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `perfiles`
--

INSERT INTO `perfiles` (`idPerfil`, `nombrePerfil`, `fechaCreacion`) VALUES
(1, 'PERSONALIZADO', '2019-12-17'),
(2, 'ADMINISTRADOR', '2019-12-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `idPermiso` int(11) NOT NULL,
  `nombrePermiso` char(100) NOT NULL,
  `descripcion` char(200) NOT NULL,
  `fechaCreacion` date NOT NULL,
  `habilitado` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`idPermiso`, `nombrePermiso`, `descripcion`, `fechaCreacion`, `habilitado`) VALUES
(1, 'Operaciones', 'Punto de venta', '2019-12-17', 1),
(2, 'Otras Operaciones', 'Operaciones más detalladas', '2019-12-17', 1),
(3, 'Movimientos y Consultas', 'Movimientos y consultas del sistema', '2019-12-17', 1),
(4, 'Stock de Existencias', 'Se puede visualizar la cantidad de items que tenemos registrados,', '2019-12-17', 1),
(5, 'Movimientos por Ventas', 'Movimientos por ventas.', '2019-12-17', 1),
(6, 'Movimiento Interno', 'Registrar movimientos internos.', '2019-12-17', 1),
(7, 'Importar Existencias', 'Formulario para cargar masivamente nuestros items.', '2019-12-17', 1),
(8, 'Actualizar Existencias.', 'Formulario para actualizar masivamente nuestro stock de items.', '2019-12-17', 1),
(9, 'Estados Financieros', 'Ver nuestros estados financieros.', '2019-12-17', 1),
(10, 'Crear Elementos', 'Formularios para poder crear datos para nuestro sistema.', '2019-12-17', 1),
(11, 'Datos Empresa', 'Formulario para poder cambiar los datos de nuestra empresa.', '2019-12-17', 1),
(12, 'Configuración de Impresión', 'Función que nos permite decidir el tipo de impresión que tendremos para cada uno de nuestros comprobantes.', '2019-12-17', 1),
(13, 'Administrar Usuarios', 'Formulario donde podremos crear, eliminar o actualizar funciones y perfiles a los usuarios de nuestro sistema.', '2019-12-17', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisosasignados`
--

CREATE TABLE `permisosasignados` (
  `idUsuarioAsignado` int(11) NOT NULL,
  `idPermisoAsignado` int(11) NOT NULL,
  `fechaCreacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `permisosasignados`
--

INSERT INTO `permisosasignados` (`idUsuarioAsignado`, `idPermisoAsignado`, `fechaCreacion`) VALUES
(1, 1, '2019-12-18'),
(1, 2, '2019-12-19'),
(1, 3, '2019-12-18'),
(1, 4, '2019-12-17'),
(1, 5, '2019-12-19'),
(1, 6, '2019-12-17'),
(1, 7, '2019-12-17'),
(1, 8, '2019-12-19'),
(1, 9, '2019-12-19'),
(1, 10, '2019-12-18'),
(1, 11, '2019-12-18'),
(1, 12, '2019-12-18'),
(1, 13, '2019-12-18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisosgrupos`
--

CREATE TABLE `permisosgrupos` (
  `idGrupoRelacionado` int(11) NOT NULL,
  `idPermisoRelacionado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `permisosgrupos`
--

INSERT INTO `permisosgrupos` (`idGrupoRelacionado`, `idPermisoRelacionado`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(3, 10),
(3, 11),
(3, 12),
(4, 13),
(5, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisosperfiles`
--

CREATE TABLE `permisosperfiles` (
  `idPerfilAsignado` int(11) NOT NULL,
  `idPermisoAperfil` int(11) NOT NULL,
  `fechaCreacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `permisosperfiles`
--

INSERT INTO `permisosperfiles` (`idPerfilAsignado`, `idPermisoAperfil`, `fechaCreacion`) VALUES
(2, 1, '2019-12-17'),
(2, 2, '2019-12-17'),
(2, 3, '2019-12-17'),
(2, 4, '2019-12-17'),
(2, 5, '2019-12-17'),
(2, 6, '2019-12-17'),
(2, 7, '2019-12-17'),
(2, 8, '2019-12-17'),
(2, 9, '2019-12-17'),
(2, 10, '2019-12-17'),
(2, 11, '2019-12-17'),
(2, 12, '2019-12-17'),
(2, 13, '2019-12-17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `nombreUsuario` char(20) NOT NULL,
  `claveUsuario` varchar(150) NOT NULL,
  `token` varchar(400) NOT NULL,
  `fechaCreacion` date NOT NULL,
  `creadoPor` int(11) NOT NULL,
  `tipoPerfil` int(11) NOT NULL,
  `habilitado` tinyint(1) NOT NULL,
  `numDocumento` int(11) NOT NULL,
  `nombres` char(150) NOT NULL,
  `apellidos` char(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombreUsuario`, `claveUsuario`, `token`, `fechaCreacion`, `creadoPor`, `tipoPerfil`, `habilitado`, `numDocumento`, `nombres`, `apellidos`) VALUES
(1, 'admin', '$2a$10$qCBL.GVxCT3ULmA37eXi2O2aw8WWkwFSAgnXRxZp/Hlcr/EgsOvWC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjEsIm5vbWJyZVVzdWFyaW8iOiJhZG1pbiIsInRpcG9QZXJmaWwiOjIsInRpbWVTdGFtcCI6IjIwMTktMTItMjBUMDE6MDg6MTguMTY1WiIsInBlcm1pc29zIjpbMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTNdLCJoYWJpbGl0YWRvIjoxLCJjcmVhZG9Qb3IiOjEsImlhdCI6MTU3NjgwNDA5OCwiZXhwIjoxNTc2ODkwNDk4fQ.vaRMivPKG2aNHBcMHjCJS5Lp5_vhRtlVKoFeMKRoBqs', '2019-12-17', 1, 2, 1, 12345678, 'administrador', 'apellidos administrador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contadores`
--
ALTER TABLE `contadores`
  ADD PRIMARY KEY (`id_contador`);

--
-- Indices de la tabla `detalle_inventarios`
--
ALTER TABLE `detalle_inventarios`
  ADD PRIMARY KEY (`idDetalle`),
  ADD KEY `idIngreso` (`idIngreso`),
  ADD KEY `codProducto` (`idProducto`);

--
-- Indices de la tabla `grupos`
--
ALTER TABLE `grupos`
  ADD PRIMARY KEY (`idGrupo`);

--
-- Indices de la tabla `info_clientes`
--
ALTER TABLE `info_clientes`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `info_fuente`
--
ALTER TABLE `info_fuente`
  ADD PRIMARY KEY (`codFuente`);

--
-- Indices de la tabla `info_grupopartidas`
--
ALTER TABLE `info_grupopartidas`
  ADD PRIMARY KEY (`idGrupoPartida`);

--
-- Indices de la tabla `info_ingresos`
--
ALTER TABLE `info_ingresos`
  ADD PRIMARY KEY (`idIngreso`),
  ADD KEY `idCliente` (`idCliente`),
  ADD KEY `codSucursal` (`codSucursal`),
  ADD KEY `idPartida` (`idPartida`),
  ADD KEY `flag` (`movimiento`),
  ADD KEY `idUsuarioRegistro` (`idUsuarioIngreso`);

--
-- Indices de la tabla `info_negocio`
--
ALTER TABLE `info_negocio`
  ADD PRIMARY KEY (`id_infonegocio`);

--
-- Indices de la tabla `info_partidas`
--
ALTER TABLE `info_partidas`
  ADD PRIMARY KEY (`idPartida`),
  ADD KEY `idGrupo` (`idGrupo`);

--
-- Indices de la tabla `info_productos`
--
ALTER TABLE `info_productos`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `codPartida` (`codPartida`),
  ADD KEY `idUsuarioRegistroP` (`idUsuarioRegistroP`);

--
-- Indices de la tabla `info_sucursales`
--
ALTER TABLE `info_sucursales`
  ADD PRIMARY KEY (`codSucursal`);

--
-- Indices de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  ADD PRIMARY KEY (`idPerfil`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`idPermiso`);

--
-- Indices de la tabla `permisosasignados`
--
ALTER TABLE `permisosasignados`
  ADD PRIMARY KEY (`idUsuarioAsignado`,`idPermisoAsignado`);

--
-- Indices de la tabla `permisosgrupos`
--
ALTER TABLE `permisosgrupos`
  ADD PRIMARY KEY (`idGrupoRelacionado`,`idPermisoRelacionado`);

--
-- Indices de la tabla `permisosperfiles`
--
ALTER TABLE `permisosperfiles`
  ADD PRIMARY KEY (`idPerfilAsignado`,`idPermisoAperfil`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `nombreUsuario` (`nombreUsuario`),
  ADD UNIQUE KEY `numDocumento` (`numDocumento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contadores`
--
ALTER TABLE `contadores`
  MODIFY `id_contador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `detalle_inventarios`
--
ALTER TABLE `detalle_inventarios`
  MODIFY `idDetalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `grupos`
--
ALTER TABLE `grupos`
  MODIFY `idGrupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `info_clientes`
--
ALTER TABLE `info_clientes`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `info_fuente`
--
ALTER TABLE `info_fuente`
  MODIFY `codFuente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `info_grupopartidas`
--
ALTER TABLE `info_grupopartidas`
  MODIFY `idGrupoPartida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `info_ingresos`
--
ALTER TABLE `info_ingresos`
  MODIFY `idIngreso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `info_negocio`
--
ALTER TABLE `info_negocio`
  MODIFY `id_infonegocio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `info_partidas`
--
ALTER TABLE `info_partidas`
  MODIFY `idPartida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `info_productos`
--
ALTER TABLE `info_productos`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `info_sucursales`
--
ALTER TABLE `info_sucursales`
  MODIFY `codSucursal` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `perfiles`
--
ALTER TABLE `perfiles`
  MODIFY `idPerfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `idPermiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Base de datos: `concadamaster`
--
CREATE DATABASE IF NOT EXISTS `concadamaster` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `concadamaster`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cadenasdeconexion`
--

CREATE TABLE `cadenasdeconexion` (
  `idCadenaDeConexion` int(11) NOT NULL,
  `cadenaConexion` varchar(300) NOT NULL,
  `fechaCreacionCDC` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cadenasdeconexion`
--

INSERT INTO `cadenasdeconexion` (`idCadenaDeConexion`, `cadenaConexion`, `fechaCreacionCDC`) VALUES
(1, 'mysql://root:@localhost/concada?charset=utf8mb4&timezone=-0500', '2019-12-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datosnegocios`
--

CREATE TABLE `datosnegocios` (
  `idDatoNegocio` int(11) NOT NULL,
  `ruc` varchar(11) NOT NULL,
  `razonSocial` varchar(150) NOT NULL,
  `nombresN` varchar(100) NOT NULL,
  `apellidospN` varchar(100) NOT NULL,
  `apellidosmN` varchar(100) NOT NULL,
  `nombreComercialN` varchar(150) NOT NULL,
  `usuariosolN` char(20) NOT NULL,
  `clavesolN` varchar(300) NOT NULL,
  `direccionN` varchar(300) NOT NULL,
  `ubigeoN` char(20) NOT NULL,
  `urbanizacionN` varchar(100) NOT NULL,
  `distritoN` varchar(100) NOT NULL,
  `provinciaN` varchar(100) NOT NULL,
  `departamentoN` varchar(100) NOT NULL,
  `rubrosN` varchar(300) NOT NULL,
  `contactoN` varchar(100) NOT NULL,
  `imagenEmpresaN` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `datosnegocios`
--

INSERT INTO `datosnegocios` (`idDatoNegocio`, `ruc`, `razonSocial`, `nombresN`, `apellidospN`, `apellidosmN`, `nombreComercialN`, `usuariosolN`, `clavesolN`, `direccionN`, `ubigeoN`, `urbanizacionN`, `distritoN`, `provinciaN`, `departamentoN`, `rubrosN`, `contactoN`, `imagenEmpresaN`) VALUES
(1, '10123456786', 'MI NEGOCIO', 'ARMANDO', 'HINOJOSA', 'CCAMA', 'MI NEGOCIO', 'usuario1', 'miclave', 'mi dirección de negocio', '6215', 'AREQUIPA', 'AREQUIPA', 'AREQUIPA', 'AREQUIPA', 'Venta de productos para el consumo humano', '987654321', '/image/logo.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datosusuariosmaster`
--

CREATE TABLE `datosusuariosmaster` (
  `idDatosUM` int(11) NOT NULL,
  `nombresUM` char(150) NOT NULL,
  `apellidosUM` char(150) NOT NULL,
  `numDocumentoUM` int(11) NOT NULL,
  `tipoDocumentoUM` char(2) NOT NULL,
  `telefonosUM` char(50) NOT NULL DEFAULT '-',
  `direccionUM` varchar(200) NOT NULL DEFAULT '-',
  `correosUM` char(200) NOT NULL DEFAULT '-',
  `ciudad` char(100) NOT NULL DEFAULT '-',
  `departamento` char(100) NOT NULL DEFAULT '-',
  `provincia` char(100) NOT NULL DEFAULT '-'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `datosusuariosmaster`
--

INSERT INTO `datosusuariosmaster` (`idDatosUM`, `nombresUM`, `apellidosUM`, `numDocumentoUM`, `tipoDocumentoUM`, `telefonosUM`, `direccionUM`, `correosUM`, `ciudad`, `departamento`, `provincia`) VALUES
(1, 'ADMINISTRADOR', 'AP ADMINISTRADOR', 12345678, '1', '-', '-', '-', '-', '-', '-'),
(2, 'ARMANDO', 'HINOJOSA CCAMA', 72378629, '0', '949044802,', 'micalle 125 - urb - dist.', 'micorreo@gmail.com,', 'AREQUIPA', 'AREQUIPA', 'AREQUIPA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rubros`
--

CREATE TABLE `rubros` (
  `idRubro` int(11) NOT NULL,
  `nombreRubro` char(100) NOT NULL,
  `fechaCreacionR` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rubros`
--

INSERT INTO `rubros` (`idRubro`, `nombreRubro`, `fechaCreacionR`) VALUES
(1, 'Óptica', '2019-12-20'),
(2, 'Restaurante', '2019-12-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rubrosnegocios`
--

CREATE TABLE `rubrosnegocios` (
  `idNegocio` int(11) NOT NULL,
  `idRubroAsignado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariosmaster`
--

CREATE TABLE `usuariosmaster` (
  `idUsuarioMaster` int(11) NOT NULL,
  `nombreUM` char(50) NOT NULL,
  `ruc` char(12) NOT NULL,
  `claveUM` char(150) NOT NULL,
  `tokenUM` varchar(400) NOT NULL,
  `fechaCreacionUM` date NOT NULL,
  `creadoPorUM` int(11) NOT NULL,
  `tipoPerfilUM` int(11) NOT NULL,
  `habilitadoUM` tinyint(1) NOT NULL,
  `idNegocioAsignado` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuariosmaster`
--

INSERT INTO `usuariosmaster` (`idUsuarioMaster`, `nombreUM`, `ruc`, `claveUM`, `tokenUM`, `fechaCreacionUM`, `creadoPorUM`, `tipoPerfilUM`, `habilitadoUM`, `idNegocioAsignado`) VALUES
(1, 'admingeneral', '123456789', '$2a$10$qCBL.GVxCT3ULmA37eXi2O2aw8WWkwFSAgnXRxZp/Hlcr/EgsOvWC', '-', '2019-12-20', 1, 2, 1, 0),
(2, 'ahinojosacc', '10723786296', '$2a$10$qCBL.GVxCT3ULmA37eXi2O2aw8WWkwFSAgnXRxZp/Hlcr/EgsOvWC', '-', '2019-12-20', 1, 2, 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cadenasdeconexion`
--
ALTER TABLE `cadenasdeconexion`
  ADD PRIMARY KEY (`idCadenaDeConexion`);

--
-- Indices de la tabla `datosnegocios`
--
ALTER TABLE `datosnegocios`
  ADD PRIMARY KEY (`idDatoNegocio`);

--
-- Indices de la tabla `datosusuariosmaster`
--
ALTER TABLE `datosusuariosmaster`
  ADD PRIMARY KEY (`idDatosUM`),
  ADD UNIQUE KEY `numDocumentoUM` (`numDocumentoUM`);

--
-- Indices de la tabla `rubros`
--
ALTER TABLE `rubros`
  ADD PRIMARY KEY (`idRubro`);

--
-- Indices de la tabla `rubrosnegocios`
--
ALTER TABLE `rubrosnegocios`
  ADD PRIMARY KEY (`idNegocio`,`idRubroAsignado`);

--
-- Indices de la tabla `usuariosmaster`
--
ALTER TABLE `usuariosmaster`
  ADD PRIMARY KEY (`idUsuarioMaster`),
  ADD UNIQUE KEY `nombreUM` (`nombreUM`),
  ADD UNIQUE KEY `ruc` (`ruc`),
  ADD KEY `idNegocioAsignado` (`idNegocioAsignado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cadenasdeconexion`
--
ALTER TABLE `cadenasdeconexion`
  MODIFY `idCadenaDeConexion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `datosnegocios`
--
ALTER TABLE `datosnegocios`
  MODIFY `idDatoNegocio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `rubros`
--
ALTER TABLE `rubros`
  MODIFY `idRubro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuariosmaster`
--
ALTER TABLE `usuariosmaster`
  MODIFY `idUsuarioMaster` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
