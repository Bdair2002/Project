import React from 'react';
import CustomForm from '../../../components/Formik/Form/Form';
import * as Yup from 'yup';
import { loginSchema } from './schema/loginSchema';
const LoginPage = () => {
  const onSubmit = (values: Record<string, string>) => {
    console.log(values);
  };
  const initialValues = { email: '', password: '' };
  const fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'example@exmaple.com',
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'your password',
      required: true,
    },
  ];
  return (
    <section>
      <CustomForm
        showIcon={false}
        initialValues={initialValues}
        fields={fields}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
      />
    </section>
  );
};

export default LoginPage;
