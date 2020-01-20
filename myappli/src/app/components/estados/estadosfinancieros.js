import React, { Component } from 'react';
import Estados from './estados';

class EstadosFinancieros extends Component {
    render() {
        return (
            <div>
                <ul className="nav nav-tabs fixed-top custom-sub-main-tab custom-h-25" role="tablist">
                    <li className="nav-item active-tab custom-h-25">
                        <a className="py-0 nav-link active custom-h-25"
                            id="estados-tab"
                            data-toggle="tab"
                            href="#estados"
                            role="tab"
                            aria-controls="estados"
                            aria-selected="true">

                            <p className="py-0">Ver</p>
                        </a>
                    </li>
                </ul>
                <div className="tab-content custom-sub-tab-content">
                    <div className="tab-pane fade show active"
                        id="estados"
                        role="tabpanel"
                        aria-labelledby="tab estados">

                        <Estados />

                    </div>
                </div>

            </div>
        )
    }

}

export default EstadosFinancieros;
