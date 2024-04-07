import { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNewSheet">
        <Form.Label>Add a new sheet</Form.Label>
        <Row>
          <Col xs={10}>
            <Form.Control
              type="text"
              placeholder="Sheet name"
              value={newSheetName}
              onChange={handleChange}
            />
          </Col>
          <Col xs={2}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
        <Form.Text className="text-muted">
          Enter the name for your new sheet.
        </Form.Text>
        <Form.Text className="text-muted">
          <i>This component is written in typescript!</i>
        </Form.Text>
      </Form.Group>
    </Form>
  );
};

export default FormInput;
