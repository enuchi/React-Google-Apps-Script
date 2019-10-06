import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles.css';

interface FormInputProps {
  newSheetFormHandler: Function;
}

export function FormInput(props: FormInputProps) {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setText((event.target as HTMLInputElement).value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.length === 0) return;

    props.newSheetFormHandler(event, text);
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
}

FormInput.propTypes = {
  newSheetFormHandler: PropTypes.func,
};
