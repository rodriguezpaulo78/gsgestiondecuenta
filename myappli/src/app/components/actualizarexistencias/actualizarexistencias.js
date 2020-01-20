import React, {Component} from 'react';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FileSaver from "file-saver";

class ActualizarExistencias extends Component {
    constructor(){
        super();
        this.state = {
            file_data: ''
        };

        this.handleInputFile = this.handleInputFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.descargarPlantilla = this.descargarPlantilla.bind(this);
    }

    // FUNCIÓN PARA SUBIR EL ARCHIVO EN EL SERVIDOR Y CARGAR LA DATA
    handleSubmit(e){
        e.preventDefault();

        const file_data = document.querySelector('input[type="file"]#upload');

        let data = new FormData()
        data.append('file_data', file_data.files[0]);

        fetch('/api/productos/productos/actualizardatos', {
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

    descargarPlantilla(){
        fetch('/api/productos/productos/plantillaimportar/2')
            .then(res => res.blob())
            .then(
                data => {
                    FileSaver.saveAs(data, 'plantilla importar.csv');
                }
            )
            .catch(err => console.log(err));
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
                <div >
                    <div className="modal-dialog modal-lg"
                         role="document">
                        <div className="modal-content">
                            <form
                                id="formUploadData"
                                onSubmit={this.handleSubmit}
                            >
                                <div className="modal-header">
                                    <h4 className="modal-title" id="modalactualizarcsv">Importar Archivo CSV</h4>
                                </div>

                                <div className="small-modal-body">
                                    <p>Desde aquí podra actualizar la lista de producto siempre y cuando el ID del producto que este registrado en el archivo CSV sea igual que en el sistema, a la vez el archivo debe contener los siguientes campos:</p>
                                    <p>Para asegurar que el ID de los productos sea el acordado, puede ir a la pestaña INICIO y en el botón <strong>Lista de Productos</strong> ver o imprimir una copia de los productos registrados en el sistema.</p>
                                    <div className="row">
                                        <div className="col-6">
                                            <ul>
                                                <li>Aux</li>
                                                <li>idProducto</li>
                                                <li>newStock</li>
                                            </ul>
                                        </div>
                                        <div className="col-6">
                                            <button
                                                type='button'
                                                className="btn btn-success mt-2"
                                                onClick={this.descargarPlantilla}
                                            >
                                                Descargar Plantilla
                                            </button>
                                        </div>
                                    </div>
                                    En el campo <strong>AUX</strong> puede poner el nombre a referencia del producto, sin embargo no será actualizado el nombre en el sistema, todo dependera del <strong>idProducto</strong>.
                                    <hr/>
                                    <input
                                        type="file"
                                        name="file_data"
                                        id="upload"
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

export default ActualizarExistencias;