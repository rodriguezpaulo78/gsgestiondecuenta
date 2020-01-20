import React, {Component} from 'react';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FileSaver from "file-saver";
import SingleInput from "../common/singleInput";

class ImportarExistencias extends Component {
    constructor(props){
        super(props);
        console.log("SUCURSALES - ModalImportarCsv");
        console.log(this.props.listaSucursales);
        this.state = {
            file_data: '',
            listaSucursales: [],
        }

        this.handleInputFile = this.handleInputFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVerificarSucursales = this.handleVerificarSucursales.bind(this);
        this.descargarPlantilla = this.descargarPlantilla.bind(this);
        this.fetchSucursales = this.fetchSucursales.bind(this);
    }

    fetchSucursales(){
        fetch('/api/sucursales/sucursales')
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        listaSucursales: data,
                    });
                }
            )
            .catch( err => console.log(err));
    }

    // FUNCIÓN PARA SUBIR EL ARCHIVO EN EL SERVIDOR Y CARGAR LA DATA
    handleSubmit(e){
        e.preventDefault();

        const file_data = document.querySelector('input[type="file"]');

        let data = new FormData()
        data.append('file_data', file_data.files[0]);
        data.append("listaSucursales", JSON.stringify(this.state.listaSucursales));

        fetch('/api/productos/productos/cargardatos', {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Se cargarón los datos', {position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" })
            })
            .catch(err => console.log(err));
    }

    handleInputFile(e){
        console.log(e.target.value);
        this.setState({
            file_data: e.target.value
        });
    }

    handleVerificarSucursales(e){
        const btnSubmit = document.getElementById('btn-Submit');
        let lista = e.target.value.split(',');
        // ****** Lista dada por el sistema *******
        let listaSucursales = [];
        for (let i = 1; i < this.state.listaSucursales.length; i++){
            listaSucursales.push(this.state.listaSucursales[i].nombreSucursal);
        }
        // *****************************************
        let existe = true;
        for (let i = 0; i < lista.length; i++){
            existe = listaSucursales.indexOf(lista[i].toUpperCase()) >= 0;
        }
        if (!existe){
            e.target.className = "form-control form-control-sm col-12 is-invalid";
            btnSubmit.disabled = true;
        }
        else{
            e.target.className = "form-control form-control-sm col-12 is-valid";
            btnSubmit.disabled = false;
        }
    }

    descargarPlantilla(){
        fetch('/api/productos/productos/plantillaimportar/1')
            .then(res => res.blob())
            .then(
                data => {
                    FileSaver.saveAs(data, 'plantilla importar.csv');
                }
            )
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.fetchSucursales();
    }


    render() {
        return (
            <div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
                <div>
                    <div className="modal-dialog modal-lg"
                         role="document">
                        <div className="modal-content">
                            <form
                                id="formUploadData"
                                onSubmit={this.handleSubmit}
                            >
                                <div className="modal-header">
                                    <h4 className="modal-title" id="modalImportarCsv">Importar Archivo CSV</h4>
                                </div>

                                <div className="small-modal-body">
                                    <p>Desde aquí podrá importar archivo CSV con la lista de su inventario, que tendran
                                        los siguientes campos:</p>
                                    <div className="row">
                                        <div className="col-6">
                                            <ul>
                                                <li>id</li>
                                                <li>nombreProducto</li>
                                                <li>stockProducto</li>
                                                <li>codUnidadProducto</li>
                                                <li>precioProducto</li>
                                                <li>costVenta</li>
                                                <li>sucursal</li>
                                                <li>serie</li>
                                            </ul>
                                        </div>
                                        <div className="col-6">
                                            <button
                                                type='button'
                                                className="btn btn-success mt-5"
                                                onClick={this.descargarPlantilla}
                                            >
                                                Descargar Plantilla
                                            </button>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="form-group">
                                        <SingleInput
                                            inputType={'text'}
                                            title={'Nombre de Sucursales'}
                                            name={'listaSucursales'}
                                            controlFunc={this.handleVerificarSucursales}
                                            labelClass={'col'}
                                            inputClass={'col-12 is-invalid'}
                                            obligatory={'true'}
                                        />
                                        <span className="text-muted mb-5">Ingrese los nombres de las SUCURSALES que esten en el archivo, separados por comas; en el caso que el cuadro se ponga rojo, es porque una sucursal no existe, por lo tanto tendra que crearlo primero y despues importar.</span>
                                    </div>
                                    <br/>
                                    <input
                                        type="file"
                                        name="file_data"
                                        id="file_data"
                                        onChange={this.handleInputFile}
                                    />
                                </div>
                                <p className="form-text text-muted text-center custom-footer-text">
                                    Importar un archivo CSV, si no tiene el formato acordado no cargarán los datos
                                </p>

                                <div className="modal-footer">
                                    <button type="button"
                                            className="btn btn-secondary"
                                            data-dismiss="modal"
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit"
                                            id="btn-Submit"
                                            className="btn btn-danger"
                                            disabled={true}
                                    >
                                        Cargar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImportarExistencias;