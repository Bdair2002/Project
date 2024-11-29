import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Typography } from '@mui/material';
import { ObjectSchema, AnyObject } from 'yup';

interface FormWrapperProps<T extends AnyObject> {
  title: string;
  initialValues: T;
  validationSchema: ObjectSchema<T>;
  onSubmit: (values: T) => void;
  children: React.ReactNode;
}

const FormWrapper = <T extends AnyObject>({
  title,
  initialValues,
  validationSchema,
  onSubmit,
  children,
}: FormWrapperProps<T>) => {
  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ dirty, isValid }) => (
          <Form>
            {children}
            <Button
              disabled={!dirty || !isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormWrapper;
