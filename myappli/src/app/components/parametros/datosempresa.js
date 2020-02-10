import React, {Component} from 'react';
import {toast, ToastContainer} from "react-toastify";
import InputComponent from "../common2/inputcomponent";

class DatosEmpresa extends Component {
    constructor(props){
        super(props);
        this.state = {
            // DATOS DE LA EMPRESA
            rucE: '',
            razonSocialE: '',
            nombresE: '',
            apellidoPaternoE: '',
            apellidoMaternoE: '',
            nombreComercialE: '',
            usuarioSolE: '',
            claveSolE: '',
            direccionE: '',
            ubigeoE: '',
            urbanizacionE: '',
            distritoE: '',
            provinciaE: '',
            departamentoE: '',
            rubroE: '',
            numeroDeContactoE: '',
            imagenEmpresaE: '',

            nuevoRuc: null,
            nuevaRazonSocial: null,
            nuevoNombres: null,
            nuevoApellidoPaterno: null,
            nuevoApellidoMaterno: null,
            nuevoNombreComercial: null,
            nuevoUsuarioSol: null,
            nuevaClaveSol: null,
            nuevaDireccion: null,
            nuevoUbigeo: null,
            nuevaUrbanizacion: null,
            nuevoDistritoE: null, // ya declarado en sucursal
            nuevaProvincia: null,
            nuevoDepartamentoE: null, // ya declarado en sucursal
            nuevoRubro: null,
            nuevoNumeroDeContacto: null,
            nuevaImagenEmpresa: null,
        };

        this.fetchDatosEmpresa = this.fetchDatosEmpresa.bind(this);
        this.crearNuevo = this.crearNuevo.bind(this);
        this.handleChangeInputComponent = this.handleChangeInputComponent.bind(this);
    }

    crearNuevo(option) {
        if (option === "DatosEmpresa"){
            console.log(this.state);
            const datos = {
                ruc: this.state.nuevoRuc,
                razon_social: this.state.nuevaRazonSocial,
                nombres: this.state.nuevoNombres,
                apellidosp: this.state.nuevoApellidoPaterno,
                apellidosm: this.state.nuevoApellidoMaterno,
                nombre_comercial: this.state.nuevoNombreComercial,
                usuariosol: this.state.nuevoUsuarioSol,
                clavesol: this.state.nuevaClaveSol,
                direccion: this.state.nuevaDireccion,
                ubigeo: this.state.nuevoUbigeo,
                urbanizacion: this.state.nuevaUrbanizacion,
                distrito: this.state.nuevoDistritoE,
                provincia: this.state.nuevaProvincia,
                departamento: this.state.nuevoDepartamentoE,
                rubros: this.state.nuevoRubro,
                contacto: this.state.nuevoNumeroDeContacto,
                imagenEmpresa: this.state.nuevaImagenEmpresa,
            };
            let datosLimpios = {};
            if (datos.ruc !== null){datosLimpios.ruc = datos.ruc;}
            if (datos.razon_social !== null){datosLimpios.razon_social = datos.razon_social.toUpperCase();}
            if (datos.nombres !== null){datosLimpios.nombres = datos.nombres.toUpperCase();}
            if (datos.apellidosp !== null){datosLimpios.apellidosp = datos.apellidosp.toUpperCase();}
            if (datos.apellidosm !== null){datosLimpios.apellidosm = datos.apellidosm.toUpperCase();}
            if (datos.nombre_comercial !== null){datosLimpios.nombre_comercial = datos.nombre_comercial.toUpperCase();}
            if (datos.usuariosol !== null){datosLimpios.usuariosol = datos.usuariosol;}
            if (datos.clavesol !== null){datosLimpios.clavesol = datos.clavesol;}
            if (datos.direccion !== null){datosLimpios.direccion = datos.direccion.toUpperCase();}
            if (datos.ubigeo !== null){datosLimpios.ubigeo = datos.ubigeo.toUpperCase();}
            if (datos.urbanizacion !== null){datosLimpios.urbanizacion = datos.urbanizacion.toUpperCase();}
            if (datos.distrito !== null){datosLimpios.distrito = datos.distrito.toUpperCase();}
            if (datos.provincia !== null){datosLimpios.provincia = datos.provincia.toUpperCase();}
            if (datos.departamento !== null){datosLimpios.departamento = datos.departamento.toUpperCase();}
            if (datos.contacto !== null){datosLimpios.contacto = datos.contacto;}
            if (datos.rubros !== null){datosLimpios.rubros = datos.rubros.toUpperCase();}
            if (datos.imagenEmpresa !== null){datosLimpios.imagenEmpresa = datos.imagenEmpresa;}

            console.log("DATOS LIMPIOS: ", datosLimpios);
            console.log("DATOS ANTIGUOS: ", datos);
            fetch('/api/negocio/actualizardatos', {
                method: 'POST',
                body: JSON.stringify(datosLimpios),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data); //id que retorno
                    toast.success('Datos de la empresa Actualizado', { position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" });
                    this.borrarTodo();
                })
                .catch(err => console.log(err));
        }
    }

    handleChangeInputComponent(evt){
        if (evt.target.value.length < 0){
            this.setState({
                [evt.target.name]: null,
            });
        }else{
            console.log(evt.target.name, ": ", evt.target.value);
            console.log(evt.target.name, ": ", this.state[evt.target.name]);
            this.setState({
                [evt.target.name]: evt.target.value,
            });
        }
    }

    fetchDatosEmpresa(){
        fetch('/api/negocio/datoscomprobante')
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        rucE: data.ruc,
                        razonSocialE: data.razon_social,
                        nombresE: data.nombres,
                        apellidoPaternoE: data.apellidosp,
                        apellidoMaternoE: data.apellidosm,
                        nombreComercialE: data.nombre_comercial,
                        usuarioSolE: data.usuariosol,
                        claveSolE: data.clavesol,
                        direccionE: data.direccion,
                        ubigeoE: data.ubigeo,
                        urbanizacionE: data.urbanizacion,
                        distritoE: data.distrito, // ydeclarado en sucursal
                        provinciaE: data.provincia,
                        departamentoE: data.departamento, //  ya declarado en sucursal
                        rubroE: data.rubros,
                        numeroDeContactoE: data.contacto,
                        imagenEmpresaE: data.imagenEmpresa,
                    });
                })
            .catch(err => console.log(err));
    }

    borrarTodo(){
        console.log("BORRANDO TODO");
        this.setState({
            // DATOS DE LA EMPRESA
            nuevoRuc: null,
            nuevaRazonSocial: null,
            nuevoNombres: null,
            nuevoApellidoPaterno: null,
            nuevoApellidoMaterno: null,
            nuevoNombreComercial: null,
            nuevoUsuarioSol: null,
            nuevaClaveSol: null,
            nuevaDireccion: null,
            nuevoUbigeo: null,
            nuevaUrbanizacion: null,
            nuevoDistritoE: null, // ya declarado en sucursal
            nuevaProvincia: null,
            nuevoDepartamentoE: null, // ya declarado en sucursal
            nuevoRubro: null,
            nuevoNumeroDeContacto: null,
            nuevaImagenEmpresa: null,
        });
    }

    componentDidMount() {
        this.fetchDatosEmpresa();
    }

    render() {
        return (
            <React.Fragment>
                <div className="row justify-content-center mb-2">
                    <ToastContainer
                        position="bottom-right"
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover
                    />
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 text-center">
                                    <h3>Cambiar Datos Empresa</h3>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-4">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            tipoInput={"number"}
                                            unaLinea={true}
                                            labelBloques={"col-4"}
                                            bloques={"col-8"}
                                            etiqueta={"RUC"}
                                            idInput={"nuevoRuc"}
                                            nombreInput={"nuevoRuc"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevoRuc}
                                            placeholder={this.state.rucE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={true}
                                            labelBloques={"col-2"}
                                            bloques={"col-10"}
                                            etiqueta={"Razón Social"}
                                            idInput={"nuevaRazonSocial"}
                                            nombreInput={"nuevaRazonSocial"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevaRazonSocial}
                                            placeholder={this.state.razonSocialE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={true}
                                            labelBloques={"col-4"}
                                            bloques={"col-8"}
                                            etiqueta={"Nombres"}
                                            idInput={"nuevoNombres"}
                                            nombreInput={"nuevoNombres"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevoNombres}
                                            placeholder={this.state.nombresE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={true}
                                            labelBloques={"col-4"}
                                            bloques={"col-8"}
                                            etiqueta={"Apellidos Paternos"}
                                            idInput={"nuevoApellidoPaterno"}
                                            nombreInput={"nuevoApellidoPaterno"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevoApellidoPaterno}
                                            placeholder={this.state.apellidoPaternoE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={true}
                                            labelBloques={"col-4"}
                                            bloques={"col-8"}
                                            etiqueta={"Apellido Materno"}
                                            idInput={"nuevoApellidoMaterno"}
                                            nombreInput={"nuevoApellidoMaterno"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevoApellidoMaterno}
                                            placeholder={this.state.apellidoMaternoE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={true}
                                            labelBloques={"col-2"}
                                            bloques={"col-10"}
                                            etiqueta={"Nombre Comercial"}
                                            idInput={"nuevoNombreComercial"}
                                            nombreInput={"nuevoNombreComercial"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevoNombreComercial}
                                            placeholder={this.state.nombreComercialE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={true}
                                            labelBloques={"col-4"}
                                            bloques={"col-8"}
                                            etiqueta={"Usuario Sol"}
                                            idInput={"nuevoUsuarioSol"}
                                            nombreInput={"nuevoUsuarioSol"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevoUsuarioSol}
                                            placeholder={this.state.usuarioSolE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            tipoInput={"password"}
                                            unaLinea={true}
                                            labelBloques={"col-4"}
                                            bloques={"col-8"}
                                            etiqueta={"Clave Sol"}
                                            idInput={"nuevaClaveSol"}
                                            nombreInput={"nuevaClaveSol"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevaClaveSol}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={true}
                                            labelBloques={"col-2"}
                                            bloques={"col-10"}
                                            etiqueta={"Dirección"}
                                            idInput={"nuevaDireccion"}
                                            nombreInput={"nuevaDireccion"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevaDireccion}
                                            placeholder={this.state.direccionE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={true}
                                            labelBloques={"col-4"}
                                            bloques={"col-8"}
                                            etiqueta={"Urbanizacion"}
                                            idInput={"nuevaUrbanizacion"}
                                            nombreInput={"nuevaUrbanizacion"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevaUrbanizacion}
                                            placeholder={this.state.urbanizacionE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={true}
                                            labelBloques={"col-4"}
                                            bloques={"col-8"}
                                            etiqueta={"Distrito"}
                                            idInput={"nuevoDistritoE"}
                                            nombreInput={"nuevoDistritoE"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevoDistritoE}
                                            placeholder={this.state.distritoE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={true}
                                            labelBloques={"col-4"}
                                            bloques={"col-8"}
                                            etiqueta={"Provincia"}
                                            idInput={"nuevaProvincia"}
                                            nombreInput={"nuevaProvincia"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevaProvincia}
                                            placeholder={this.state.provinciaE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={true}
                                            labelBloques={"col-4"}
                                            bloques={"col-8"}
                                            etiqueta={"Departamento"}
                                            idInput={"nuevoDepartamentoE"}
                                            nombreInput={"nuevoDepartamentoE"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevoDepartamentoE}
                                            placeholder={this.state.departamentoE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={true}
                                            labelBloques={"col-4"}
                                            bloques={"col-8"}
                                            etiqueta={"Ubigeo"}
                                            idInput={"nuevoUbigeo"}
                                            nombreInput={"nuevoUbigeo"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevoUbigeo}
                                            placeholder={this.state.ubigeoE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            tipoInput={"number"}
                                            unaLinea={true}
                                            labelBloques={"col-4"}
                                            bloques={"col-8"}
                                            etiqueta={"Número de Contacto"}
                                            idInput={"nuevoNumeroDeContacto"}
                                            nombreInput={"nuevoNumeroDeContacto"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevoNumeroDeContacto}
                                            placeholder={this.state.numeroDeContactoE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={true}
                                            labelBloques={"col-2"}
                                            bloques={"col-10"}
                                            etiqueta={"Rubros"}
                                            idInput={"nuevoRubro"}
                                            nombreInput={"nuevoRubro"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevoRubro}
                                            placeholder={this.state.rubroE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>

                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={true}
                                            labelBloques={"col-2"}
                                            bloques={"col-10"}
                                            etiqueta={"Imagen de la Empresa(link)"}
                                            idInput={"nuevaImagenEmpresa"}
                                            nombreInput={"nuevaImagenEmpresa"}
                                            readOnly={false}
                                            valorDefecto={this.state.nuevaImagenEmpresa}
                                            placeholder={this.state.imagenEmpresaE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>

                                    <div className="form-row mt-2">
                                        <InputComponent
                                            unaLinea={"true"}
                                            labelBloques={"col-2"}
                                            bloques={"col-10"}
                                            etiqueta={"Ruta del facturador SUNAT"}
                                            idInput={"facturador"}
                                            nombreInput={"facturador"}
                                            readOnly={false}
                                            //valorDefecto={this.state.nuevaImagenEmpresa}
                                            //placeholder={this.state.imagenEmpresaE}
                                            funcionControl={this.handleChangeInputComponent}
                                        />
                                    </div>

                                    <div className="form-row justify-content-center mt-3">
                                        <div className="col-6">
                                            <button
                                                className="btn btn-success btn-block"
                                                onClick={this.crearNuevo.bind(this, 'DatosEmpresa')}
                                            >
                                                ACTUALIZAR DATOS DE EMPRESA
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DatosEmpresa;