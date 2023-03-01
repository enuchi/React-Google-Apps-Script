import React from 'react';
import { Formik } from 'formik';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface FormInputProps {
  submitNewSheet: (sheetName: string) => {
    name: string;
    index: number;
    isActive: boolean;
  };
}

const FormInput = ({ submitNewSheet }: FormInputProps) => {
  return (
    <Formik
      initialValues={{ newSheetName: '' }}
      onSubmit={(values, { resetForm }) => {
        if (values?.newSheetName?.length === 0) return;
        submitNewSheet(values?.newSheetName);
        resetForm();
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                id="sheet-name"
                label="New Sheet Name"
                variant="outlined"
                value={props.values.newSheetName}
                onChange={props.handleChange}
                name="newSheetName"
                onBlur={props.handleBlur}
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
          <br/>
          <Typography variant="caption" gutterBottom sx={{ fontStyle: 'italic' }}>
            This component is written in
            typescript!
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default FormInput;
