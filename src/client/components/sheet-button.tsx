import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css';

interface SheetButtonProps {
  name: {
    sheetIndex: number;
    text: string;
    isActive: boolean;
  };
  deleteButtonHandler: Function;
  clickSheetNameHandler: Function;
}

export function SheetButton(props: SheetButtonProps) {
  const { name, deleteButtonHandler, clickSheetNameHandler } = props;

  const { sheetIndex, text, isActive } = name;

  return (
    <div className="sheetLine">
      <button onClick={e => deleteButtonHandler(e, sheetIndex)}>X</button>
      <span
        onClick={e => clickSheetNameHandler(e, text)}
        className={'sheetNameText ' + (isActive ? 'active-sheet' : '')}
      >
        {text}
      </span>
    </div>
  );
}

SheetButton.propTypes = {
  name: PropTypes.object,
  deleteButtonHandler: PropTypes.func,
  clickSheetNameHandler: PropTypes.func,
};
