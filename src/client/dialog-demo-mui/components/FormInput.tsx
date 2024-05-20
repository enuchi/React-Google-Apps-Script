import { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';

interface FormInputProps {
  submitNewSheet: (sheetName: string) => {
    name: string;
    index: number;
    isActive: boolean;
  };
}

const FormInput = ({ submitNewSheet }: FormInputProps) => {
  const [newSheetName, setNewSheetName] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setNewSheetName(event.target.value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newSheetName.length === 0) return;
    submitNewSheet(newSheetName);
    setNewSheetName('');
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            id="sheet-name"
            label="New Sheet Name"
            variant="outlined"
            value={newSheetName}
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
