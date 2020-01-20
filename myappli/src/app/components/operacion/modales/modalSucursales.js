import React, { Component } from 'react';

class ModalSucursales extends Component {
    render() {
        return (
            <div className="modal fade"
                id="modalSucursales"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="modalSucursales"
                aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-scrollable"
                    role="document">
                    <div className="modal-content" style={{ height: '500px' }}>
                        <div className="modal-header">
                            <div className="col-3">
                                <h5 className="modal-title" id="modalSucursales">
                                    Elegir Sucursal
                            </h5>
                            </div>
                            <div className="col-6 text-center">
                                <label>
                                    Buscar
                            </label>
                                <input
                                    className="ml-2 text-center"
                                    type="text"
                                    ref={this.props.ref_sucursal}
                                    id="inputSearchSucursales"
                                    onKeyUp={this.props.buscarPor.bind(this, 'buscar_por_sucursal')}
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
                                    name="admin_sucursal"
                                    data-toggle="modal"
                                    data-target="#modalAdmin"
                                    onClick={this.props.setAdminOption.bind(this, 'Sucursal')}>
                                    Crear
                                <i className=" ml-2 fas fa-plus"></i>
                                </button>
                            </div>
                            <button type="button"
                                className="col-1 close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.props.clearModal.bind(this, 'Sucursal')}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* Formulario modal */}
                            <div className="row">
                                {/*table sucursalesfrom json data*/}
                                <div className="table-responsive text-center mt-2">
                                    <table className="table table-sm table-bordered" id="idTablaSucursales">
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
                                                        onClick={this.props.getFilaSucursal.bind(this, value.codSucursal, value.nombreSucursal)}>
                                                        <td>
                                                            {value.codSucursal}
                                                        </td>
                                                        <td>
                                                            {value.nombreSucursal}
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
                                onClick={this.props.clearModal.bind(this, 'Sucursal')}>
                                Cancelar
                        </button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ModalSucursales;