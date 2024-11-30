import React from 'react';
import * as Yup from 'yup';
import { MenuItem, Menu } from '@mui/material';
import InputField from '../../../../components/Formik/Input';
import FormWrapper from '../../../../components/shared/FormWrapper';
import { useFetchHotelsQuery } from '../../../../redux/slices/adminSlices/hotelsSlice';
type AddRoomFormProps = {
  onSubmit: (values: Record<string, unknown>) => void;
};
const AddRoomForm = ({ onSubmit }: AddRoomFormProps) => {
  const { data } = useFetchHotelsQuery();
  const initialValues = { roomNumber: '', hotel: '', cost: 0 };

  const validationSchema = Yup.object().shape({
    roomNumber: Yup.string()
      .required('Room number is required')
      .matches(/^\d+$/, 'Room number must be numeric'),

    cost: Yup.number()
      .required('Cost is required')
      .positive('Cost must be a positive number')
      .min(1, 'Cost must be greater than zero'),
  });

  return (
    <FormWrapper
      title="Add Room"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      <InputField name="roomNumber" label="Room Number" placeholder="Enter room number" />

      <InputField name="cost" label="Cost ($)" type="number" placeholder="Enter room cost" />
    </FormWrapper>
  );
};

export default AddRoomForm;
