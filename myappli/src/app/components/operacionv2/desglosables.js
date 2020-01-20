import React, {Component} from 'react';

class Desglosables extends Component {

    render() {
        return (
            <div className="card"   >
                <div className="card-header" id={this.props.id} data-toggle="collapse"
                     data-target={"#" + "collapse" + this.props.id} aria-expanded="true"
                     aria-controls={"#" + "collapse" + this.props.id} >
                    <h5 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse"
                                data-target={"#" + "collapse" + this.props.id} aria-expanded="true"
                                aria-controls={"#" + "collapse" + this.props.id}>
                            {this.props.titulo} <b>{this.props.comentario}</b>
                        </button>
                    </h5>
                </div>

                <div id={"collapse" + this.props.id} className={"collapse " + (this.props.abierto? "show": "")} aria-labelledby={this.props.id}>
                    <div className="card-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Desglosables;