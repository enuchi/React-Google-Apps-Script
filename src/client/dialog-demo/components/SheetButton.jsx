import PropTypes from 'prop-types';

const SheetButton = ({ sheetDetails, deleteSheet, setActiveSheet }) => {
  const { index, name, isActive } = sheetDetails;

  return (
    <div className="sheetLine">
      <button className="delete" onClick={() => deleteSheet(index)}>
        &times;
      </button>
      <button className="basicButton" onClick={() => setActiveSheet(name)}>
        <span className={`sheetNameText ${isActive ? 'active-sheet' : ''}`}>
          {name}
        </span>
      </button>
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
