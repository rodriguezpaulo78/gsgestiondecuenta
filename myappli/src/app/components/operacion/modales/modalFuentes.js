import React, { Component } from 'react';

class ModalFuentes extends Component {
    render() {
        return (
            <div className="modal fade"
                id="modalFuentes"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modalFuentes"
                aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content" style={{ height: '500px' }}>
                        <div className="modal-header">
                            <div className="col-3">
                                <h5 className="modal-title" id="modalFuentes">
                                    Elegir Fuente
                                    </h5>
                            </div>
                            <div className="col-6 text-center">
                                <label>
                                    Buscar
                                    </label>
                                <input
                                    className="ml-2 text-center"
                                    type="text"
                                    id="inputSearchFuentes"
                                    ref={this.props.ref_fuente}
                                    onKeyUp={this.props.buscarPor.bind(this, 'buscar_por_fuente')}
                                />
                                <button className="ml-2 btn btn-outline-primary btn-sm my-2 my-sm-0"
                                    type="submit">
                                    <i className="ml-1 fas fa-search"></i>
                                </button>
                            </div>
                            <div className="col-2">
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                    data-backdrop="static"
                                    data-keyboard="false"
                                    name="admin_fuente"
                                    data-toggle="modal"
                                    data-target="#modalAdmin"
                                    onClick={this.props.setAdminOption.bind(this, 'Fuente')}>
                                    Crear
                                        <i className=" ml-2 fas fa-plus"></i>
                                </button>
                            </div>
                            <button type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.props.clearModal.bind(this, 'Fuente')}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Formulario modal */}
                            <div className="row">
                                <div className="table-responsive text-center mt-2">
                                    <table className="table table-sm table-bordered" id="idTablaFuentes">
                                        <thead>
                                            <tr className="clickable-row">
                                                {this.props.cabeceras_modal_select.map((value, i) => {
                                                    return (
                                                        <th key={i}>
                                                            {value}
                                                        </th>
                                                    )
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.contenido_modal_select.map((value, i) => {
                                                return (
                                                    <tr className="custom-doubleclicked"
                                                        key={i}
                                                        data-dismiss="modal"
                                                        onClick={this.props.getFilaFuente.bind(this, value.codFuente, value.fuente)}>
                                                        <td>
                                                            {value.codFuente}
                                                        </td>
                                                        <td>
                                                            {value.fuente}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <p className="form-text text-muted text-center custom-footer-text">
                            Busque un elemento y luego haga click sobre éste para registrarlo.
                                </p>
                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={this.props.clearModal.bind(this, 'Fuente')}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalFuentes;