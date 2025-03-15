import { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Button, ListGroup } from 'react-bootstrap';
import FormInput from './FormInput';

// This is a wrapper for google.script.run that lets us use promises.
import {
  serverFunctions,
  scriptHostFunctions,
} from '../../utils/serverFunctions';

const SheetEditor = () => {
  const [names, setNames] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    serverFunctions.getSheetsData().then(setNames).catch(alert);
  }, []);

  const deleteSheet = (sheetIndex) => {
    serverFunctions.deleteSheet(sheetIndex).then(setNames).catch(alert);
  };

  const setActiveSheet = (sheetName) => {
    serverFunctions.setActiveSheet(sheetName).then(setNames).catch(alert);
  };

  const submitNewSheet = async (newSheetName) => {
    try {
      const response = await serverFunctions.addSheet(newSheetName);
      setNames(response);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };

  return (
    <div style={{ padding: '3px', overflowX: 'hidden' }}>
      <p>
        <b>☀️ Bootstrap demo! ☀️</b>
      </p>
      <p>
        This is a sample app that uses the <code>react-bootstrap</code> library
        to help us build a simple React app. Enter a name for a new sheet, hit
        enter and the new sheet will be created. Click the red{' '}
        <span className="text-danger">&times;</span> next to the sheet name to
        delete it.
      </p>
      <FormInput submitNewSheet={submitNewSheet} />
      <ListGroup>
        <TransitionGroup className="sheet-list">
          {names.length > 0 &&
            names.map((name) => (
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
      {names.length > 0 && (
        <div className="d-flex justify-content-end py-3">
          {!isExpanded ? (
            <Button
              variant="light"
              className="mr-2"
              onClick={() => {
                scriptHostFunctions.setHeight(1000);
                scriptHostFunctions.setWidth(1000);
                setIsExpanded(true);
              }}
            >
              Expand Dialog
            </Button>
          ) : null}
          <Button
            variant="outline-dark"
            onClick={() => scriptHostFunctions.close()}
          >
            Close Dialog Window
          </Button>
        </div>
      )}
    </div>
  );
};

export default SheetEditor;
