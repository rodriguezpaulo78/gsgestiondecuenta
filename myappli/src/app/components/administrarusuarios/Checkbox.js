import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        checked: props.checked
      };
      this._handleChange = this._handleChange.bind(this);
      
    }
  
    _handleChange(){
      this.setState({
        checked: !this.state.checked
      });
    };
  
    render() {
      const { disabled } = this.props;
      const { checked } = this.state;
      const { id } = this.props;
      return (
        <div className="prueba">
          <label>
            <input
              type="checkbox"
              className="prueba2"
              id={id}
              checked={checked}
              disabled={disabled}
              onChange={this._handleChange}
            />
            <span className="prueba3" />
          </label>
        </div>
      );
    }
};

Checkbox.propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string,
  };

Checkbox.defaultProps = {
    checked: false,
    disabled: false
  };
  
export default Checkbox;