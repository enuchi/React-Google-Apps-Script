import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ newSheetFormHandler }) => {
  const [text, setText] = useState('');

  const handleChange = event => setText(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    if (text.length === 0) return;

    newSheetFormHandler(event, text);
    setText('');
  };

  return (
    <div className="formBlock">
      <span>Add a sheet: </span>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={text} />
      </form>
    </div>
  );
};

export default FormInput;

FormInput.propTypes = {
  newSheetFormHandler: PropTypes.func,
};
