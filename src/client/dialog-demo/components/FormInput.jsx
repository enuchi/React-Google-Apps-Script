import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ submitNewSheet }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => setInputValue(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.length === 0) return;

    submitNewSheet(inputValue);
    setInputValue('');
  };

  return (
    <div className="formBlock">
      <form onSubmit={handleSubmit}>
        <div>
          <span>Add a sheet</span>
        </div>
        <div>
          <input
            onChange={handleChange}
            value={inputValue}
            placeholder="New sheet name"
          />
          <button className="submit" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormInput;

FormInput.propTypes = {
  submitNewSheet: PropTypes.func,
};
