import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
      <TransitionGroup>
        {names.length
          ? names.map(name => {
              return (
                <CSSTransition
                  key={name.sheetName}
                  classNames="sheetNames"
                  timeout={{ enter: 100, exit: 100 }}
                >
                  <SheetButton
                    name={name}
                    deleteButtonHandler={deleteButtonHandler}
                    clickSheetNameHandler={clickSheetNameHandler}
                    key={name.sheetName}
                  />
                </CSSTransition>
              );
            })
          : null}
      </TransitionGroup>
    </div>
  );
}
