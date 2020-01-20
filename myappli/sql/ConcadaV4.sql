-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-12-2019 a las 18:56:44
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_fuente`
--

CREATE TABLE `info_fuente` (
  `codFuente` int(11) NOT NULL,
  `fuente` varchar(30) DEFAULT NULL,
  `saldo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_grupopartidas`
--

CREATE TABLE `info_grupopartidas` (
  `idGrupoPartida` int(11) NOT NULL,
  `nombreGrupo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_partidas`
--

CREATE TABLE `info_partidas` (
  `idPartida` int(11) NOT NULL,
  `nombrePartida` varchar(50) DEFAULT NULL,
  `idGrupo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `campo1p` char(20) DEFAULT NULL,
  `campo2p` char(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contadores`
--
ALTER TABLE `contadores`
  ADD PRIMARY KEY (`id_contador`);

INSERT INTO `contadores` (`id_contador`, `codigo`, `valor1`, `valor2`) VALUES
(1, 'boleta', 'E001', 0),
(2, 'factura', 'F001', 0);

INSERT INTO `info_sucursales` (`codSucursal`, `nombreSucursal`, `direccionSucursal`, `distrito`, `provincia`, `departamento`) VALUES
(1, 'SELECCIONE SUCURSAL', '--', '--', '--', '--');

INSERT INTO `info_negocio` (`id_infonegocio`, `ruc`, `razon_social`, `nombres`, `apellidosp`, `apellidosm`, `nombre_comercial`, `usuariosol`, `clavesol`, `direccion`, `ubigeo`, `urbanizacion`, `distrito`, `provincia`, `departamento`, `rubros`, `contacto`, `imagenEmpresa`) VALUES
(1, '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-');

INSERT INTO `info_fuente` (`codFuente`, `fuente`, `saldo`) VALUES
(1, '-', 'NULL');

INSERT INTO `info_Partidas` (`idPartida`, `nombrePartida`, `idGrupo`) VALUES
(1, '', 1);

INSERT INTO `info_GrupoPartidas` (`idGrupoPartida`, `nombreGrupo`) VALUES
(1, '');
--
-- Indices de la tabla `detalle_inventarios`
--
ALTER TABLE `detalle_inventarios`
  ADD PRIMARY KEY (`idDetalle`),
  ADD KEY `idIngreso` (`idIngreso`),
  ADD KEY `codProducto` (`idProducto`);

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contadores`
--
ALTER TABLE `contadores`
  MODIFY `id_contador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_inventarios`
--
ALTER TABLE `detalle_inventarios`
  MODIFY `idDetalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `info_clientes`
--
ALTER TABLE `info_clientes`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `info_fuente`
--
ALTER TABLE `info_fuente`
  MODIFY `codFuente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `info_grupopartidas`
--
ALTER TABLE `info_grupopartidas`
  MODIFY `idGrupoPartida` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `info_ingresos`
--
ALTER TABLE `info_ingresos`
  MODIFY `idIngreso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `info_negocio`
--
ALTER TABLE `info_negocio`
  MODIFY `id_infonegocio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `info_partidas`
--
ALTER TABLE `info_partidas`
  MODIFY `idPartida` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `info_productos`
--
ALTER TABLE `info_productos`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `info_sucursales`
--
ALTER TABLE `info_sucursales`
  MODIFY `codSucursal` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
