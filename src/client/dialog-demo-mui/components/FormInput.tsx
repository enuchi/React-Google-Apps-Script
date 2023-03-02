import React, { useState } from 'react';
import { Typography, Button, Grid, TextField } from '@mui/material';

interface FormInputProps {
  submitNewSheet: (sheetName: string) => {
    name: string;
    index: number;
    isActive: boolean;
  };
}

const FormInput = ({ submitNewSheet }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.length === 0) return;

    submitNewSheet(inputValue);
    setInputValue('');
  };

  const handleChange = (event) => setInputValue(event.target.value);
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            id="sheet-name"
            label="New Sheet Name"
            variant="outlined"
            value={inputValue}
            onChange={handleChange}
            name="newSheetName"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid
          item
          xs={2}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
      <Typography variant="caption" gutterBottom>
        Enter the name for your new sheet.
      </Typography>
      <br />
      <Typography variant="caption" gutterBottom sx={{ fontStyle: 'italic' }}>
        This component is written in typescript!
      </Typography>
    </form>
  );
};

export default FormInput;
