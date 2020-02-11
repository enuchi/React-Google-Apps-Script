import React, { useState, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FormInput from './form-input';
import SheetButton from './sheet-button';

import server from '../server';

export default function SheetEditor() {
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

  const newSheetFormHandler = (e, newSheetTitle) => {
    addSheet(newSheetTitle)
      .then(setNames)
      .catch(alert);
  };

  return (
    <div>
      <FormInput newSheetFormHandler={newSheetFormHandler} />
      <ReactCSSTransitionGroup
        transitionName="sheetNames"
        transitionAppear={true}
        transitionEnterTimeout={100}
        transitionLeaveTimeout={100}
      >
        {names.length
          ? names.map(name => {
              return (
                <SheetButton
                  name={name}
                  deleteButtonHandler={deleteButtonHandler}
                  clickSheetNameHandler={clickSheetNameHandler}
                  key={name.sheetName}
                />
              );
            })
          : null}
      </ReactCSSTransitionGroup>
    </div>
  );
}
