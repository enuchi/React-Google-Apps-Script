import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const SheetButton = ({ sheetDetails, deleteSheet, setActiveSheet }) => {
  const { index, name, isActive } = sheetDetails;

  return (
    <div className="sheetLine">
      <Button type="ghost" onClick={() => deleteSheet(index)}>
        &times;
      </Button>
      <Button type="primary" onClick={() => setActiveSheet(name)}>
        <span className={`sheetNameText ${isActive ? 'active-sheet' : ''}`}>
          {name}
        </span>
      </Button>
    </div>
  );
};

export default SheetButton;

SheetButton.propTypes = {
  sheetDetails: PropTypes.shape({
    index: PropTypes.number,
    name: PropTypes.string,
    isActive: PropTypes.bool,
  }),
  deleteSheet: PropTypes.func,
  setActiveSheet: PropTypes.func,
};
