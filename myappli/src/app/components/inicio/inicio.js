import React, { Component } from 'react';
import ListaProductos from './listaproductos';
import BotonesDeAtajo from "./botonesdeatajo";

class Inicio extends Component {
    constructor(props){
        super(props);
        this.state = {
            option_selected: 0,
        }

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(event){
        console.log(event.target.name);
        if (event.target.name === "productos"){
            this.setState({
                option_selected: 1,
            });
        }else if(event.target.name === "goback"){
            this.setState({
                option_selected: 0,
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid bg-white">
                    <div className="body-atajos">
                        <ListaProductos
                            eventOnClick={this.props.handleOnClick}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default Inicio;