import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import InputField from '../../../components/Formik/Input';
import useCart from '../../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
interface PaymentFormValues {
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  paymentMethod: string;
}

const PaymentForm = () => {
  const navigate = useNavigate();
  const cart = useCart();
  const auth = useAuth();
  const initialValues: PaymentFormValues = {
    cardholderName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    paymentMethod: 'Credit Card', // Default value
  };

  const PaymentSchema = Yup.object().shape({
    cardholderName: Yup.string().required('Cardholder name is required'),
    cardNumber: Yup.string()
      .matches(/^\d+$/, 'Card number must be a number')
      .required('Card number is required'),
    expirationDate: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Enter a valid expiration date (MM/YY)')
      .required('Expiration date is required'),
    cvv: Yup.string()
      .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
      .required('CVV is required'),
    paymentMethod: Yup.string().required('Payment method is required'),
  });

  const handleSubmit = (values: PaymentFormValues) => {
    cart.confirmBooking({
      bookingDateTime: cart.bookings[0].checkInDate,
      paymentMethod: values.paymentMethod,
      totalCost: cart.bookings.reduce((acc, booking) => acc + (booking.price ?? 0), 0),
      customerName: `${auth.user?.given_name} ${auth.user?.family_name}`,
      roomNumber: `${cart.bookings[0].roomId}`,
      roomType: cart.bookings[0].roomType,
    });
    navigate('/confirmation');
  };

  return (
    <Formik initialValues={initialValues} validationSchema={PaymentSchema} onSubmit={handleSubmit}>
      {({ errors, touched, values, setFieldValue, dirty, isValid }) => (
        <Form>
          <InputField name="cardholderName" label="Cardholder Name" autoComplete="name" />

          <InputField name="cardNumber" label="Card Number" autoComplete="cc-number" />

          <InputField name="expirationDate" label="Expiration Date (MM/YY)" autoComplete="cc-exp" />

          <InputField name="cvv" label="CVV" autoComplete="cc-csc" type="password" />

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Payment Method</FormLabel>
            <RadioGroup
              row
              name="paymentMethod"
              value={values.paymentMethod}
              onChange={event => setFieldValue('paymentMethod', event.target.value)}>
              <FormControlLabel value="Credit Card" control={<Radio />} label="Credit Card" />
              <FormControlLabel value="PayPal" control={<Radio />} label="PayPal" />
              <FormControlLabel value="Bank Transfer" control={<Radio />} label="Bank Transfer" />
            </RadioGroup>
          </FormControl>

          <Typography variant="body2" color="error" align="left" sx={{ mt: 2 }}>
            {(errors.cardNumber && touched.cardNumber && errors.cardNumber) ||
              (errors.expirationDate && touched.expirationDate && errors.expirationDate) ||
              (errors.cvv && touched.cvv && errors.cvv) ||
              (errors.paymentMethod && touched.paymentMethod && errors.paymentMethod)}
          </Typography>
          <Box />

          <Button
            disabled={!dirty || !isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Submit Payment
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
