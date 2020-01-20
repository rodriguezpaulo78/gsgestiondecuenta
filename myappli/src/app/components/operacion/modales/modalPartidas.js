import React, { Component } from 'react';

class ModalPartidas extends Component {
    render() {
        return (
            <div className="modal fade"
                id="modalPartidas"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modalPartidas"
                aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content" style={{ height: '500px' }}>
                        <div className="modal-header">
                            <div className="col-3">
                                <h5 className="modal-title" id="modalPartidas">
                                    Elegir Partida
                                </h5>
                            </div>
                            <div className="col-6 text-center">
                                <label>
                                    Buscar
                                </label>
                                <input
                                    className="ml-2 text-center"
                                    type="text"
                                    id="inputSearchPartidas"
                                    ref={this.props.ref_partida}
                                    onKeyUp={this.props.buscarPor.bind(this, 'buscar_por_partida')}
                                />
                                <button className="ml-2 btn btn-outline-primary btn-sm my-2 my-sm-0"
                                    type="submit">
                                    <i className="ml-1 fas fa-search"></i>
                                </button>
                            </div>
                            <div className="col-0">
                                <button
                                    type="button"
                                    className="btn btn-success btn-sm mr-1"
                                    data-backdrop="static"
                                    data-keyboard="false"
                                    name="admin_partida"
                                    data-toggle="modal"
                                    data-target="#modalAdmin"
                                    onClick={this.props.setAdminOption.bind(this, 'Partida')}>
                                    Crear
                                    <i className=" ml-2 fas fa-plus"></i>
                                </button>
                                {/*<button
                                    type="button"
                                    className="btn btn-primary btn-sm ml-1"
                                    data-backdrop="static"
                                    data-keyboard="false"
                                    name="admin_partida"
                                    data-toggle="modal"
                                    data-target="#modalAdminEditar"
                                    onClick={this.props.setAdminOption.bind(this, 'Partida')}>
                                    Editar
                                    <i className=" ml-2 fas fa-pen"></i>
                                </button>*/}
                            </div>
                            <button type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.props.clearModal.bind(this, 'Partida')}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Formulario modal */}
                            <div className="row">
                                {/*table partidas from json data*/}
                                <div className="table-responsive text-center mt-2">
                                    <table className="table table-sm table-bordered" id="idTablaPartidas">
                                        <thead>
                                            <tr>
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
                                                    <tr key={i}
                                                        className="custom-doubleclicked"
                                                        data-dismiss="modal"
                                                        onClick={this.props.getFilaPartida.bind(this, value.idPartida, value.nombrePartida, value.nombreGrupo)}>

                                                        <td>
                                                            {value.idPartida}
                                                        </td>
                                                        <td>
                                                            {value.nombrePartida}
                                                        </td>
                                                        <td>
                                                            {value.nombreGrupo}
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
                                onClick={this.props.clearModal.bind(this, 'Partida')}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalPartidas;