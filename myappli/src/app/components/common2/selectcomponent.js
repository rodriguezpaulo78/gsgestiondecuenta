import React from 'react';
import PropTypes from 'prop-types';

const SelectComponent = (props) => {
    if (props.unaLinea){
        return (
            <React.Fragment>
                <label id={props.idComponent} htmlFor={props.idSelect} className={props.labelBloques + " col-form-label"} style={props.estaOculto? {display:'none'}:{}}>{props.etiqueta}</label>
                <div id={props.idComponent} className={props.bloques} style={props.estaOculto? {display:'none'}:{}}>
                    <select
                        className="form-control"
                        id={props.idSelect}
                        name={props.nombreSelect}
                        placeholder={props.placeholder}
                        value={props.valorDefecto}
                        onChange={props.funcionControl}
                        disabled={props.desactivado? "disabled":""}
                    >
                        {
                            props.esJson && (
                                props.contenido.map(elemento => {
                                    return (
                                        <option key={elemento[props.nombreValor]}
                                                value={elemento[props.nombreValor]}>{elemento[props.nombreMostrar]}</option>
                                    )
                                })
                            )
                        }

                        {
                            !props.esJson && (
                                props.contenido.map((elemento, indice) => {
                                    return (
                                        <option key={indice} value={indice + 1}>{elemento}</option>
                                    )
                                })
                            )
                        }
                    </select>
                </div>
            </React.Fragment>
        );
    }else{
        return (<React.Fragment>
            <div className={props.bloques + " text-center"} style={props.estaOculto? {display:'none'}:{}} id={props.idComponent}>
                <label htmlFor={props.idSelect}>{props.etiqueta}</label>
                <select
                    className="form-control"
                    id={props.idSelect}
                    name={props.nombreSelect}
                    placeholder={props.placeholder}
                    value={props.valorDefecto}
                    onChange={props.funcionControl}
                    disabled={props.desactivado? "disabled":""}
                >
                    {
                        props.esJson && (
                            props.contenido.map(elemento => {
                                return (
                                    <option key={elemento[props.nombreValor]}
                                            value={elemento[props.nombreValor]}>{elemento[props.nombreMostrar]}</option>
                                )
                            })
                        )
                    }

                    {
                        !props.esJson && (
                            props.contenido.map((elemento, indice) => {
                                return (
                                    <option key={indice} value={indice + 1}>{elemento}</option>
                                )
                            })
                        )
                    }
                </select>
            </div>
        </React.Fragment>)
    }
};

SelectComponent.propTypes = {
    idComponent: PropTypes.string,
    bloques: PropTypes.string.isRequired,
    labelBloques: PropTypes.string,
    etiqueta: PropTypes.string.isRequired,
    idSelect: PropTypes.string.isRequired,
    nombreSelect: PropTypes.string.isRequired,

    esJson: PropTypes.bool.isRequired,
    unaLinea: PropTypes.bool,
    estaOculto: PropTypes.bool,
    desactivado: PropTypes.bool,

    contenido: PropTypes.array.isRequired,

    nombreValor: PropTypes.string,
    nombreMostrar: PropTypes.string,

    valorDefecto: PropTypes.number,

    funcionControl: PropTypes.func.isRequired,

};

export default SelectComponent;