import React from 'react';
import * as Yup from 'yup';
import InputField from '../../../../components/Formik/Input';
import FormWrapper from '../../../../components/shared/FormWrapper';

type AddHotelFormProps = {
  onSubmit: (values: Record<string, unknown>) => void;
};
const AddHotelForm = ({onSubmit}:AddHotelFormProps ) => {
  const initialValues = {
    name: '',
    description: '',
    hotelType: '',
    starRating: 0,
    latitude: '',
    longitude: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Hotel name is required'),
    description: Yup.string().required('Description is required'),
    hotelType: Yup.string().required('Hotel type is required'),
    starRating: Yup.number()
      .required('Star rating is required')
      .min(1, 'Minimum 1 star')
      .max(5, 'Maximum 5 stars'),
    latitude: Yup.string().required('Latitude is required'),
    longitude: Yup.string().required('Longitude is required'),
  });



  return (
    <FormWrapper
      title="Add Hotel"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      <InputField name="name" label="Hotel Name" placeholder="Enter hotel name" />
      <InputField name="description" label="Description" placeholder="Enter description" />
      <InputField name="hotelType" label="Hotel Type" placeholder="Enter hotel type" />
      <InputField
        name="starRating"
        label="Star Rating"
        type="number"
        placeholder="Enter star rating"
      />
      <InputField name="latitude" label="Latitude" placeholder="Enter latitude" />
      <InputField name="longitude" label="Longitude" placeholder="Enter longitude" />
    </FormWrapper>
  );
};

export default AddHotelForm;
