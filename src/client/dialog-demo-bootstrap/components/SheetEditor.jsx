import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Form, Button, ListGroup, Col, Row } from 'react-bootstrap';

// This is a wrapper for google.script.run that lets us use promises.
import server from '../../utils/server';

const { serverFunctions } = server;

const SheetEditor = () => {
  const [newSheetName, setNewSheetName] = useState('');
  const [names, setNames] = useState([]);

  useEffect(() => {
    serverFunctions
      .getSheetsData()
      .then(setNames)
      .catch(alert);
  }, []);

  const deleteSheet = sheetIndex => {
    serverFunctions
      .deleteSheet(sheetIndex)
      .then(setNames)
      .catch(alert);
  };

  const setActiveSheet = sheetName => {
    serverFunctions
      .setActiveSheet(sheetName)
      .then(setNames)
      .catch(alert);
  };

  const submitNewSheet = async () => {
    try {
      const response = await serverFunctions.addSheet(newSheetName);
      setNames(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div style={{ padding: '3px', overflowX: 'hidden' }}>
      <Form onSubmit={submitNewSheet}>
        <Form.Group controlId="formNewSheet">
          <Form.Label>Add a new sheet</Form.Label>
          <Row>
            <Col xs={10}>
              <Form.Control
                type="text"
                placeholder="Sheet name"
                value={newSheetName}
                onChange={e => {
                  setNewSheetName(e.target.value);
                }}
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
        </Form.Group>
      </Form>
      <ListGroup>
        <TransitionGroup className="sheet-list">
          {names.length > 0 &&
            names.map(name => (
              <CSSTransition
                classNames="sheetNames"
                timeout={500}
                key={name.name}
              >
                <ListGroup.Item
                  className="d-flex"
                  key={`${name.index}-${name.name}`}
                >
                  <Button
                    className="border-0"
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteSheet(name.index)}
                  >
                    &times;
                  </Button>
                  <Button
                    className="border-0 mx-2"
                    variant={name.isActive ? 'success' : 'outline-success'}
                    onClick={() => setActiveSheet(name.name)}
                  >
                    {name.name}
                  </Button>
                </ListGroup.Item>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </ListGroup>
    </div>
  );
};

export default SheetEditor;
