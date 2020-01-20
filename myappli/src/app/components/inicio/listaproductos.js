import React, { Component } from 'react';
import Select from "../common/select";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import TableBootstrap from "../common/tableBootstrap";
import FileSaver from 'file-saver';

class ListaProductos extends Component{
    constructor(props){
        super(props);
        this.state = {
            lista_sucursales: [],

            provedorSeleccionado: '-1',
            listaProductos: [],
            tipoCondicion: "",
            unidadesMinimas: 0,
            cabeceraTabla: [
                "ID Producto",
                "Descripción",
                "Stock",
                "Precio Venta",
                "Precio Costo",
                "Sucursal",
                "Serie",
                "Cod Unidad de Medida",
            ],
            nombreTablaDb: [
                "idProducto",
                "nombreProducto",
                "stockProducto",
                "precioProducto",
                "costVenta",
                "sucursal",
                "serie",
                "codUnidadMedida"
            ],

            productos: [],
        };

        this.renderOpcionesBusqueda = this.renderOpcionesBusqueda.bind(this);
        this.renderListaProductos = this.renderListaProductos.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleGeneratePDF = this.handleGeneratePDF.bind(this);
        this.handleBtnMostrar = this.handleBtnMostrar.bind(this);
        this.handleBtnExcel = this.handleBtnExcel.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);

    }

    componentDidMount() {
        fetch('/api/sucursales/sucursales')
            .then(res => res.json())
            .then(
                data => {
                    console.log("Se obtuvieron las sucursales...");
                    console.log(data);
                    this.setState({
                        lista_sucursales: data
                    });
                }
            )
            .catch( err => console.log(err));
    }

    handleChangeSelect(e){
        if (e.target.name === 'sucursalesSelect'){
            console.log("Cambiando sucursal:", e.target.value);
            console.log('---------------------');
            this.setState({
                provedorSeleccionado: e.target.value,
            })
        }
        if (e.target.name === "condicionSelect"){
            console.log("Cambiando Filtro");
            console.log(e.target.value);
            console.log(this.state.nombreTablaDb[this.state.cabeceraTabla.indexOf(e.target.value)]);
            this.setState({
                tipoCondicion: this.state.nombreTablaDb[this.state.cabeceraTabla.indexOf(e.target.value)]
            });
            console.log("ESTADO:", this.state.tipoCondicion);
        }
    }


    handleGeneratePDF(){
        alert("Aún en desarrollo...");
        const domElement = document.getElementById('tablaProductos')
        html2canvas(domElement, {useCORS: true})
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png')
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297)
                pdf.save('lista-productos.pdf')
            })

        /*
        const imgToBase64 = (url, callback, imgVariable) => {

            if (!window.FileReade) {
                callback(null);
                return;
            }
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function() {
                var reader = new FileReader();
                reader.onloadend = function() {
                    imgVariable = reader.result.replace('text/xml', 'image/jpeg');
                    callback(imgVariable);
                };
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.send();
        };

        const header = (doc) => {
            doc.setFontSize(30);
            doc.setTextColor(40);
            doc.setFontStyle('normal');

            if (base64Img) {
                doc.addImage(base64Img, 'JPEG', margins.left, 10, 40,40);
            }

            doc.text("Report Header Template", margins.left + 50, 40 );

            doc.line(3, 70, margins.width + 43,70); // horizontal line
        };

        const footer = (doc, pageNumber, totalPages) => {

            var str = "Page " + pageNumber + " of " + totalPages

            doc.setFontSize(10);
            doc.text(str, margins.left, doc.internal.pageSize.height - 20);

        };

        const headerFooterFormatting = (doc) => {
            var totalPages  = doc.internal.getNumberOfPages();

            for(var i = totalPages; i >= 1; i--)
            { //make this page, the current page we are currently working on.
                doc.setPage(i);

                header(doc);

                footer(doc, i, totalPages);

            }
        };

        let base64Img = null;

        imgToBase64('octocat.jpg', function(base64) {
            base64Img = base64;
        });

        let margins = {
            top: 70,
            bottom: 40,
            left: 30,
            width: 550
        };
        let pdf = new jsPDF('p', 'pt', 'a4');
        pdf.setFontSize(18);
        pdf.fromHTML(document.getElementById('tablaProductos'),
            margins.left, // x coord
            margins.top,
            {
                // y coord
                width: margins.width// max width of content on PDF
            },function(dispose) {
                headerFooterFormatting(pdf)
            },
            margins);

        let iframe = document.createElement('iframe');
        iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
        document.body.appendChild(iframe);

        iframe.src = pdf.output('datauristring');
        */
    }

    handleBtnExcel(){
        fetch('/api/productos/productos/exportar/' + this.state.provedorSeleccionado + "/" + this.state.unidadesMinimas, {
            method: 'POST'
        })
            .then(res => res.blob())
            .then(
                data => {
                    console.log("Recibiendo dato");
                    console.log(data);
                    FileSaver.saveAs(data, 'lista.xlsx');
                }
            )
            .catch(err => {
                console.log("ERROR AL SOLICITAR RUTA");
                console.log(err);
            });
    }

    // Función para el filtro
    handleOnChange(e){
        console.log(this.state.provedorSeleccionado, this.state.tipoCondicion, e.target.value, "--", this.state.tipoCondicion);
        if (e.target.name === 'valorCondicion'){
            fetch('/api/productos/productos/filtro/' + this.state.provedorSeleccionado + '/' + this.state.tipoCondicion + '/' + e.target.value)
                .then(res => res.json())
                .then(
                    data => {
                        console.log("Datos de respuesta");
                        console.log(data);
                        this.setState({
                            listaProductos: data,
                        });
                        console.log(data);
                    }
                )
                .catch(err => console.log(err));
        }
    }

    handleBtnMostrar(){
        console.log("Proveedor: ", this.state.provedorSeleccionado);
        fetch('/api/productos/productos/sucursal/' + this.state.provedorSeleccionado)
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        listaProductos: data,
                    });
                    console.log(data);
                }
            )
            .catch(err => console.log(err));
    }

    renderOpcionesBusqueda(){
        return (
            <div className="row">
                <div className="col-12 col-sm-6">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6">
                            <Select
                                name={"sucursalesSelect"}
                                options={this.state.lista_sucursales}
                                controlFunc={this.handleChangeSelect}
                                keyName={"codSucursal"}
                                valueName={"nombreSucursal"}
                                title={"Seleccione Sucursal: "}
                                placeholder={"Seleccione una Sucursal"}
                                labelClass={"col"}
                                inputClass={"form-control form-control-lg mt-n2 title-select"}

                                selectAll={true}
                                keyDefault={-1}
                                valueDefault={"TODAS LAS SUCURSALES"}
                            />
                        </div>

                        <div className="col-12 col-sm-12 col-md-6">
                            <div className="row">
                                <div className="col-12">
                                    <Select
                                        notJson={true}
                                        name={"condicionSelect"}
                                        options={this.state.cabeceraTabla}
                                        controlFunc={this.handleChangeSelect}
                                        title={"Seleccion Filtro: "}
                                        labelClass={"col"}
                                        inputClass={"form-control form-control-lg mt-n2 title-select"}
                                        placeholder={"Seleccione Campo"}
                                        selectAll={false}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input type="text"
                                           name="valorCondicion"
                                           className="form-control"
                                           onChange={this.handleOnChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-sm-6">
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <button
                                className="btn btn-success btn-block mt-3"
                                onClick={this.handleBtnMostrar}
                            >
                                MOSTRAR
                            </button>
                        </div>

                        <div className="col-12 col-sm-6">
                            <button
                                className="btn btn-warning btn-block mt-3"
                                onClick={() => {console.log("Imprimiendo..."); window.print()}}
                            >
                                IMPRIMITR
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <button
                                className="btn btn-primary btn-block mt-3"
                                onClick={this.handleGeneratePDF}
                            >
                                GENERAR PDF
                            </button>
                        </div>

                        <div className="col-12 col-sm-6">
                            <button
                                onClick={this.handleBtnExcel}
                                className="btn btn-secondary btn-block mt-3"
                            >
                                GENERAR EXCEL
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    renderListaProductos(){
        return (
            <div className="row">
                <div className="col-12">
                    <div id="tablaProductos">
                        <TableBootstrap
                            isKeyIndex={true}
                            keyIndexRow={0}
                            headersNames={this.state.cabeceraTabla}
                            data={this.state.listaProductos}
                            keyNameRow={'idProducto'}
                            namesColumnData={[
                                "nombreProducto",
                                "stockProducto",
                                "precioProducto",
                                "costVenta",
                                "sucursal",
                                "serie",
                                "codUnidadMedida"
                            ]}
                            />
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="body-lista-productos">
                    {this.renderOpcionesBusqueda()}

                    <hr/>

                    {this.renderListaProductos()}
                </div>
            </div>
            )
    }
}

export default ListaProductos;