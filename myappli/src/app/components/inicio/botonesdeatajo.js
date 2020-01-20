import React, { Component } from 'react';
import SuperBoton from "../common/superButton";
import ListaProductos from "./listaproductos";

class BotonesDeAtajo extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className="container-fluid bg-white">
                <div className="body-atajos">
                    {this.props.optionSelected === 0 &&
                    <div id="buttons">
                        <div className="row">
                            <div className="col-4">
                                <SuperBoton
                                    name={"productos"}
                                    text={"Lista de Productos"}
                                    heightBtn={200}
                                    backgroundColor={'yellow'}
                                    fontColor={'red'}
                                    eventOnClick={this.props.handleOnClick}
                                />
                            </div>
                        </div>
                    </div>
                    }

                    {this.props.optionSelected === 1 &&
                        <ListaProductos
                            eventOnClick={this.props.handleOnClick}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default BotonesDeAtajo;