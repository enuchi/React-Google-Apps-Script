import { FunctionalComponent, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { FormInput } from './form-input';
import { SheetButton } from './sheet-button';

import { serverMethods } from '../server';

interface SheetEditorProps {}

interface SheetEditorState {
  sheetName: string;
  sheetIndex: number;
  text: string;
  isActive: boolean;
}

export const SheetEditor: FunctionalComponent<SheetEditorProps> = (
  props: SheetEditorProps
) => {
  const {
    getSheetsData,
    addSheet,
    deleteSheet,
    setActiveSheet,
  } = serverMethods;

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
    </div>
  );
};
