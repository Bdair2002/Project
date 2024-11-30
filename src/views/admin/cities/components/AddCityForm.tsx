import React from 'react';
import * as Yup from 'yup';
import InputField from '../../../../components/Formik/Input';
import FormWrapper from '../../../../components/shared/FormWrapper';
import useSnackbar from '../../../../hooks/useSnackbar';
type AddCityFormProps = {
  onSubmit: (values: Record<string, unknown>) => void;
};
const AddCityForm = ({ onSubmit }: AddCityFormProps) => {
  const snackBar = useSnackbar();
  const initialValues = { name: '', description: '' };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('City name is required'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <FormWrapper
      title="Add City"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      <InputField name="name" label="City Name" placeholder="Enter city name" />
      <InputField name="description" label="Description" placeholder="Enter description" />
    </FormWrapper>
  );
};

export default AddCityForm;
