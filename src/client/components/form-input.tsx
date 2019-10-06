import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import '../styles.css';

interface FormInputProps {
  newSheetFormHandler: Function;
}

export const FormInput: FunctionalComponent<FormInputProps> = (
  props: FormInputProps
) => {
  const [text, setText] = useState('');

  const handleChange = (event: Event) =>
    setText((event.target as HTMLInputElement).value);

  const handleSubmit = (event: Event) => {
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
};
