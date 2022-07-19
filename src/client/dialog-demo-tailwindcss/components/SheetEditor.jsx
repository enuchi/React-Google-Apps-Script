import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ListGroup, Button } from 'flowbite-react';
import FormInput from './FormInput';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const SheetEditor = () => {
  const [names, setNames] = useState([]);

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
    <div className="p-3 overflow-x-hidden">
      <p className="mb-2 text-2xl font-bold">
        ☀️ Tailwind CSS / React-Flowbite demo! ☀️
      </p>
      <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
        This is a sample app that uses the <code>flowbite-react</code> library
        to help us build a simple React app. Enter a name for a new sheet, hit
        enter and the new sheet will be created. Click the red{' '}
        <span className="bg-red-700 dark:bg-red-600 rounded-full h-min w-fit font-medium text-white text-sm text-center justify-center p-0.5 px-3 py-1.5">
          &times;
        </span>{' '}
        next to the sheet name to delete it.
      </p>
      <FormInput submitNewSheet={submitNewSheet} />
      <ListGroup className="border-0">
        <TransitionGroup className="sheet-list">
          {names.length > 0 &&
            names.map((name) => (
              <CSSTransition
                // classNames="sheetNames"
                classNames={{
                  appear: 'opacity-0',
                  appearActive:
                    'opacity-1 transition-opacity duration-300 ease-in',
                  appearDone: 'opacity-1',
                  enter: 'opacity-0',
                  enterActive:
                    'opacity-1 transition-opacity duration-300 ease-in',
                  enterDone: 'opacity-1',
                  exit: 'opacity-1',
                  exitActive:
                    'opacity-0 transition-opacity duration-300 ease-in',
                  exitDone: 'opacity-0',
                }}
                timeout={300}
                key={name.name}
              >
                <ListGroup.Item key={`${name.index}-${name.name}`}>
                  <div className="mt-4 flex space-x-3 lg:mt-6">
                    <Button
                      className="inline-flex items-center"
                      pill={true}
                      color="failure"
                      size="sm"
                      onClick={() => deleteSheet(name.index)}
                    >
                      &times;
                    </Button>
                    <Button
                      className="inline-flex items-center"
                      outline={!name.isActive}
                      color="success"
                      onClick={() => setActiveSheet(name.name)}
                    >
                      {name.name}
                    </Button>
                  </div>
                </ListGroup.Item>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </ListGroup>
    </div>
  );
};

export default SheetEditor;
