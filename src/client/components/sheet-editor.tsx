import React, { useState, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FormInput } from './form-input';
import { SheetButton } from './sheet-button';

import server from '../server';

interface SheetEditorProps {}

interface SheetEditorState {
  sheetName: string;
  sheetIndex: number;
  text: string;
  isActive: boolean;
}

export function SheetEditor(props: SheetEditorProps) {
  const { getSheetsData, addSheet, deleteSheet, setActiveSheet } = server;

  const [names, setNames] = useState<SheetEditorState[]>([
    {
      sheetName: '',
      text: '',
      sheetIndex: 0,
      isActive: false,
    },
  ]);

  useEffect(() => {
    getSheetsData()
      .then(setNames)
      .catch(alert);
  }, []);

  const deleteButtonHandler = (e: Event, sheetIndex: number) => {
    deleteSheet(sheetIndex)
      .then(setNames)
      .catch(alert);
  };

  const clickSheetNameHandler = (e: Event, sheetName: string) => {
    setActiveSheet(sheetName)
      .then(setNames)
      .catch(alert);
  };

  const newSheetFormHandler = (e: Event, newSheetTitle: string) => {
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
