import React, { Component } from 'react';
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val : 'primera'
        }

        this.function = this.function.bind(this);
    }
    function(clase)
    {
            window.addEventListener('load', function() {
              // Fetch all the forms we want to apply custom Bootstrap validation styles to
              var forms = document.getElementsByClassName(clase);
              // Loop over them and prevent submission
              var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                  if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                  form.classList.add('was-validated');
                }, false);
              });
            }, false);
         
    }
    render() {

        return (
            <div className="container-fluid">
            <form className ="first-form"  noValidate>  
                    <div className="form-row">
                       
                        
                        <div className="col-md-4 mb-3">
                            <label htmlFor="validationCustomUsername">Username</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                </div>
                                <input type="text" className="form-control" id="validationCustomUsername" placeholder="Username" aria-describedby="inputGroupPrepend" required />
                                <div className="invalid-feedback">
                                    Please choose a username.
                                 </div>
                            </div>
                        </div>
                    </div>
                    </form>  
            
                    <form className ="second-form"  noValidate>  

                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="validationCustom03">City</label>
                            <input type="text" className="form-control" id="validationCustom03" placeholder="City" required />
                            <div className="invalid-feedback">
                                Please provide a valid city.
                                                   </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationCustom04">State</label>
                            <input type="text" className="form-control" id="validationCustom04" placeholder="State" required />
                            <div className="invalid-feedback">
                                Please provide a valid state.
                                               </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationCustom05">Zip</label>
                            <input type="text" className="form-control" id="validationCustom05" placeholder="Zip" required />
                            <div className="invalid-feedback">
                                Please provide a valid zip.
                                                   </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                            <label className="form-check-label" htmlFor="invalidCheck">
                                Agree to terms and conditions
                                </label>
                            <div className="invalid-feedback">
                                You must agree before submitting.
                                                </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit" onClick={this.function('first-form')}>Submit form</button>
                    </form>
                    
                   
            </div>
        );
    }
}

export default Test;
