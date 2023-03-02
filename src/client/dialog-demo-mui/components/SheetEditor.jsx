import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';

import FormInput from './FormInput';
import SheetTable from './SheetTable';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';

const SheetEditor = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    serverFunctions.getSheetsData().then(setNames).catch(alert);
  }, []);

  const deleteSheet = (sheetIndex) => {
    serverFunctions.deleteSheet(sheetIndex).then(setNames).catch(alert);
  };

  const setActiveSheet = (sheetName) => {
    serverFunctions.setActiveSheet(sheetName).then(setNames).catch(alert);
  };

  const submitNewSheet = async (newSheetName) => {
    try {
      const response = await serverFunctions.addSheet(newSheetName);
      setNames(response);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };

  return (
    <div style={{ padding: '3px', overflowX: 'hidden' }}>
      <Typography variant="h4" gutterBottom>
        ☀️ MUI demo! ☀️
      </Typography>

      <Typography variant="body1" gutterBottom sx={{ marginBottom: '30px' }}>
        This is a sample app that uses the <code>mui</code> library to help us
        build a simple React app. Enter a name for a new sheet, hit enter and
        the new sheet will be created. Click the red button next to the sheet
        name to delete it.
      </Typography>
      <FormInput submitNewSheet={submitNewSheet} />

      {names.length > 0 && (
        <SheetTable
          rows={names.map((name) => {
            return {
              sheetName: name.name,
              goToButton: (
                <Button
                  variant="outlined"
                  disabled={name?.isActive}
                  onClick={() => setActiveSheet(name.name)}
                >
                  Go To Sheet
                </Button>
              ),
              deleteButton: (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteSheet(name.index)}
                >
                  Delete
                </Button>
              ),
            };
          })}
        />
      )}
    </div>
  );
};

export default SheetEditor;
