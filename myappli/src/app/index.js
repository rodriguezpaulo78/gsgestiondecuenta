import React from 'react';
import { render } from 'react-dom';
import App from './App';
import Presentacion from "./components/inicio/presentacion";

//Lo vas a renderizar en el documento donde obtengas el elemento app 
render(<Presentacion/>,document.getElementById('app'));
