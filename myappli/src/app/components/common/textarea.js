import React from 'react';
import PropTypes from 'prop-types';

const TextArea = (props) => (
	<div className="row mt-1">
		<div className="col">
			<label>
				{props.title}
			</label>
		</div>
		<div className="col">
			<textarea
				className="form-control form-control-sm custom-text-area"
				style={props.resize ? null : { resize: 'none' }}
				name={props.name}
				rows={props.rows}
				value={props.content}
				onChange={props.controlFunc}
				placeholder={props.placeholder} />
		</div>
	</div>
);

TextArea.propTypes = {
	title: PropTypes.string.isRequired,
	rows: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	resize: PropTypes.bool,
	placeholder: PropTypes.string,
	controlFunc: PropTypes.func.isRequired
};

export default TextArea;