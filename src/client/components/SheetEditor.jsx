/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FormInput from './FormInput';
import SheetButton from './SheetButton';

import server from '../server';

const SheetEditor = () => {
  const { getSheetsData, addSheet, deleteSheet, setActiveSheet } = server;

  const [names, setNames] = useState([]);

  useEffect(() => {
    getSheetsData()
      .then(setNames)
      .catch(alert);
  }, []);

  const deleteButtonHandler = (e, sheetIndex) => {
    deleteSheet(sheetIndex)
      .then(setNames)
      .catch(alert);
  };

  const clickSheetNameHandler = (e, sheetName) => {
    setActiveSheet(sheetName)
      .then(setNames)
      .catch(alert);
  };

  // just for fun, let's use async/await for this one
  const newSheetFormHandler = async (e, newSheetTitle) => {
    try {
      const response = await addSheet(newSheetTitle);
      setNames(response);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <FormInput newSheetFormHandler={newSheetFormHandler} />
      <TransitionGroup className="todo-list">
        {names.length &&
          names.map(name => (
            <CSSTransition
              transitionName="sheetNames"
              transitionAppear={true}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
              key={name.sheetName}
            >
              <SheetButton
                name={name}
                deleteButtonHandler={deleteButtonHandler}
                clickSheetNameHandler={clickSheetNameHandler}
              />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
};

export default SheetEditor;
