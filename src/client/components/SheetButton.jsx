import React from 'react';
import PropTypes from 'prop-types';

const SheetButton = ({ name, deleteButtonHandler, clickSheetNameHandler }) => {
  const { sheetIndex, text, isActive } = name;

  return (
    <div className="sheetLine">
      <button onClick={e => deleteButtonHandler(e, sheetIndex)}>X</button>
      <span
        onClick={e => clickSheetNameHandler(e, text)}
        className={`sheetNameText ${isActive ? 'active-sheet' : ''}`}
      >
        {text}
      </span>
    </div>
  );
};

export default SheetButton;

SheetButton.propTypes = {
  name: PropTypes.shape({
    sheetIndex: PropTypes.number,
    text: PropTypes.string,
    isActive: PropTypes.bool,
  }),
  deleteButtonHandler: PropTypes.func,
  clickSheetNameHandler: PropTypes.func,
};
