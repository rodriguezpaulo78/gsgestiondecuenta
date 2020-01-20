import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DataListComponent extends Component{
    constructor(props){
        super(props);
    }

    render() {
        if (this.props.unaLinea){
            return (
                <React.Fragment>
                    <label htmlFor={this.props.idInput} className={this.props.labelBloques + " col-form-label"}>{this.props.etiqueta}</label>
                    <div className = {this.props.bloques}>
                        <input
                            type = "text"
                            className = "form-control"
                            readOnly={this.props.readOnly}
                            id={this.props.idInput}
                            name={this.props.nombreInput}
                            placeholder={this.props.placeholder}
                            value={this.props.valorDefecto}
                            onChange={this.props.funcionControl}
                            onBlur={this.props.blurFuncionControl}
                            disabled={this.props.desactivado? "disabled":""}
                            list={this.props.nombreInput + "Lista"}
                        />
                        {
                            this.props.listaDatos && (
                                <datalist id={this.props.nombreInput + "Lista"}>
                                    {
                                        this.props.listaDatos.map((e, i) => {
                                            return (
                                                <option key={i} value={e[this.props.nombreLista]}/>
                                            );
                                        })
                                    }
                                </datalist>
                            )
                        }
                    </div>
                </React.Fragment>
            );
        }else{
            return (
                <React.Fragment>
                    <div className={this.props.bloques + (!this.props.children? " text-center": "")} id={this.props.idComponent} style={this.props.estaOculto? {display:'none'}:{}}>
                        {
                            this.props.children && (
                                <div style={{marginBottom: '40px'}}>
                                    <div className="float-right">
                                        {this.props.children}
                                    </div>
                                    <div className="float-left text-center" style={{marginTop: this.props.margiTopSpace? this.props.marginTopSpace: ''}}>
                                        <label style={{width: this.props.widthLabel? this.props.widthLabel: '', textAlign: "center"}} htmlFor={this.props.idSelect}>{this.props.etiqueta}</label>
                                    </div>
                                </div>
                            )
                        }

                        {
                            !this.props.children && (
                                <label htmlFor={this.props.idSelect}>{this.props.etiqueta}</label>
                            )

                        }
                        <input
                            type="text"
                            className="form-control"
                            id={this.props.idInput}
                            name={this.props.nombreInput}
                            placeholder={this.props.placeholder}
                            value={this.props.valorDefecto}
                            onChange={this.props.funcionControl}
                            onBlur={this.props.blurFuncionControl}
                            readOnly={this.props.readOnly}
                            disabled={this.props.desactivado? "disabled":""}
                            list={this.props.nombreInput + "Lista"}
                        />
                        {
                            this.props.listaDatos && (
                                <datalist id={this.props.nombreInput + "Lista"}>
                                    {
                                        this.props.listaDatos.map((e, i) => {
                                            return (
                                                <option key={i} value={e[this.props.nombreLista]}/>
                                            );
                                        })
                                    }
                                </datalist>
                            )
                        }
                    </div>
                </React.Fragment>
            );
        }
    }
}

DataListComponent.propTypes = {
    idComponent: PropTypes.string,

    bloques: PropTypes.string.isRequired,
    labelBloques: PropTypes.string,
    etiqueta: PropTypes.string.isRequired,
    idInput: PropTypes.string.isRequired,
    nombreInput: PropTypes.string.isRequired,

    readOnly: PropTypes.bool.isRequired,
    unaLinea: PropTypes.bool,
    desactivado: PropTypes.bool,

    valorDefecto: PropTypes.string,

    funcionControl: PropTypes.func.isRequired,
    blurFuncionControl: PropTypes.func,
    listaDatos: PropTypes.array,

    valorLista: PropTypes.string,
    nombreLista: PropTypes.string,
};


export default DataListComponent;