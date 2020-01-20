import React, {Component} from 'react';

class TablaDetalles extends Component {
    render() {
        return (
            <div className={this.props.bloques} id={this.props.idComponent} style={this.props.estaOculto? {display: "none"}: {}}>
                <div className="table-responsive-sm">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr key={0}>
                                <th style={{textAlign: "center", width: "20px"}}>Cant.</th>
                                <th style={{textAlign: "center", width: "20px"}}>Und.</th>
                                <th style={{textAlign: "center"}}>Descripción</th>
                                <th style={{textAlign: "center", width: "120px"}}>V. Unitario</th>
                                <th style={{textAlign: "center", width: "120px"}}>P. Unitario</th>
                                <th style={{textAlign: "center", width: "120px"}}>P. Venta</th>
                                <th style={{textAlign: "center"}}></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.registros.map((elemento, indice) => {
                                return (
                                    <tr key={indice+1}>
                                        <td align="center">{elemento.modal_cantidad}</td>
                                        <td align="center">{elemento.modal_medida}</td>
                                        <td>{elemento.modal_descripcion}</td>
                                        <td align="right">{elemento.modal_valUnitario}</td>
                                        <td align="right">{elemento.modal_precUnitario}</td>
                                        <td align="right">{elemento.modal_precTotal}</td>
                                        <td align="center">
                                            <button className="btn btn-danger btn-sm"
                                                    onClick={this.props.funcionBorrar.bind(this, indice)}
                                            >
                                                <i className=" ml-2 fas fa-trash-alt"/>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TablaDetalles;