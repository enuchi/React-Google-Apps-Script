import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css';

const SheetButton = (props) => {
  let sheetIndex = props.name.sheetIndex;
  let sheetName = props.name.text;
  let isActiveSheet = props.name.isActive;
  return (
    <div className="sheetLine">
      <button
        onClick={(e) => props.deleteButtonHandler(e, sheetIndex)}
      >X
      </button>
      <span
          onClick={(e) => props.clickSheetNameHandler(e, sheetName)}
          className={'sheetNameText ' + (isActiveSheet ? 'active-sheet' : '')}
        >{sheetName}
      </span>
    </div>
  );
};

export default SheetButton;

SheetButton.propTypes = {
  name: PropTypes.object,
  deleteButtonHandler: PropTypes.func,
  clickSheetNameHandler: PropTypes.func,
};
