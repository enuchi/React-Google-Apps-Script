import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { Form, Button, Col, Row } from 'react-bootstrap';
import { ListGroup, Button, Table, Label, TextInput } from 'flowbite-react';

interface FormInputProps {
  submitNewSheet: (sheetName: string) => {
    name: string;
    index: number;
    isActive: boolean;
  };
}

const FormInput = ({ submitNewSheet }: FormInputProps) => {
  const [newSheetName, setNewSheetName] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setNewSheetName(event.target.value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newSheetName.length === 0) return;
    submitNewSheet(newSheetName);
    setNewSheetName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <ListGroup>
        <ListGroup.Item>
          <Label>Add a new sheet</Label>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <div className="inline-flex items-center">
              <TextInput
                type="text"
                placeholder="Sheet name"
                value={newSheetName}
                onChange={handleChange}
                />
            </div>
            <div className="inline-flex items-center">
              <Button type="submit">
                Submit
              </Button>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="text-gray-300 dark:text-gray-200">
            Enter the name for your new sheet.
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
            <div className="italic text-gray-300 dark:text-gray-200">
              <i>This component is written in typescript!</i>
            </div>
        </ListGroup.Item>
      </ListGroup>
    </form>
  );
};

export default FormInput;
