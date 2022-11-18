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
    <form className="flex w-full mx-auto items-center" onSubmit={handleSubmit}>
      <div className="grow pr-2 py-1">
        <input
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 transition-colors duration-200 ease-in-out"
            onChange={handleChange}
            value={inputValue}
            placeholder="New sheet name"
        />
      </div>
      <button
        className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded" 
        type="submit"
      >Add Sheet</button>
    </form>
  );
};

export default FormInput;

FormInput.propTypes = {
  submitNewSheet: PropTypes.func,
};
