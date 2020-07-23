import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FormInput from './FormInput';
import SheetButton from './SheetButton';

// This is a wrapper for google.script.run that lets us use promises.
import server from '../../utils/server';

const { serverFunctions } = server;

const SheetEditor = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    // Call a server global function here and handle the response with .then() and .catch()
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

  // You can also use async/await notation for server calls with our server wrapper.
  // (This does the same thing as .then().catch() in the above handlers.)
  const submitNewSheet = async newSheetName => {
    try {
      const response = await serverFunctions.addSheet(newSheetName);
      setNames(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <FormInput submitNewSheet={submitNewSheet} />
      <TransitionGroup className="sheet-list">
        {names.length > 0 &&
          names.map(name => (
            <CSSTransition
              classNames="sheetNames"
              timeout={500}
              key={name.name}
            >
              <SheetButton
                sheetDetails={name}
                deleteSheet={deleteSheet}
                setActiveSheet={setActiveSheet}
              />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
};

export default SheetEditor;
