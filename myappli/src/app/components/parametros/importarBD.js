import React, {Component} from 'react';
import {toast, ToastContainer} from "react-toastify";

class importarBD extends Component {

    constructor(props){
        super(props);
        this.state = {
          file_data: '',
        }

        this.handleInputFile = this.handleInputFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


  // FUNCIÓN PARA SUBIR EL ARCHIVO Y EJECUTAR EL SQL
  handleSubmit(e){
      e.preventDefault();

      const file_data = document.querySelector('input[type="file"]');

      let data = new FormData()
      data.append('file_data', file_data.files[0]);

      fetch('/api/tasks/import', {
          method: 'POST',
          body: data
      })
          .then(res => res.json())
          .then(data => {
              console.log(data);
              toast.success('Se cargaron los datos', {position: "bottom-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, transition: "slide" })
          })
          .catch(err => console.log(err));
  }

  handleInputFile(e){
      console.log(e.target.value);
      this.setState({
          file_data: e.target.value
      });
  }

  /*
  setCurrentDB(data){
    if (data == 'refused') {
      let queries = FileSystem.readFileSync(path.join(__dirname, 'db_file.sql'), { encoding: "UTF-8" }).split(";\n");
      for (let query of queries) {
        query = query.trim();
        if (query.length !== 0 && !query.match(/\/\* /)) {  //juntar el * y el / luego de descomentar
          connection2.query(query, function (err, sets, fields) {
            if (err) {
              console.log(`Importing failed for Mysql Database  - Query:${query}`);
            } else {
              console.log(`Importing Mysql Database  - Query:${query}`);
            }
          });
        }
      }
    } else if (data == 'connected') {
      console.log(`Connected to Mysql Database  `);
  }
}

setCurrentDB(callback) {
this.conn.query(`USE dbname`, function (err, rows) {
  if (err) {
    if (err.errno == 1049) {
      console.log(`${err.sqlMessage} : Failed to connect MySql database`);
      return callback('refused');
    } else {
      console.log(`Mysql Database connection error`);
      return callback('refused');
    }
  } else {
    return callback('connected');
  }
});
}
*/

render() {
  return (
      <div>
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
          <div>
              <div className="modal-dialog modal-lg"
                   role="document">
                  <div className="modal-content">
                      <form
                          id="formUploadData"
                          onSubmit={this.handleSubmit}
                      >
                          <div className="modal-header">
                              <h4 className="modal-title" id="modalImportarCsv">Importar Base de Datos</h4>
                          </div>

                          <div className="small-modal-body">
                              <p>Desde aquí podrá importar un archivo SQL con la data de su empresa de una manera sencilla y rápida</p>
                              <hr/>
                             
                              <input
                                  type="file"
                                  name="file_data"
                                  id="file_data"
                                  onChange={this.handleInputFile}
                              />
                          </div>
                          <p className="form-text text-muted text-center custom-footer-text">
                              Importar un archivo SQL, si no tiene el formato acordado no cargarán los datos a la BD
                          </p>

                          <div className="modal-footer">
                              <button type="button"
                                      className="btn btn-secondary"
                                      data-dismiss="modal"
                              >
                                  Cancelar
                              </button>
                              <button type="submit"
                                      id="btn-Submit"
                                      className="btn btn-danger"
                                      disabled={false}
                              >
                                  Cargar
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  );
}
}

export default importarBD;