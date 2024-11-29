import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from './Input';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  decorators: [
    Story => (
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

const FormikWrapper: React.FC<{ children: React.ReactNode; args: any }> = ({ children, args }) => (
  <Formik
    initialValues={{ [args.name]: '' }}
    validationSchema={Yup.object({
      [args.name]: Yup.string()
        .required('This field is required')
        .max(args.maxLength || 50, `Must be ${args.maxLength || 50} characters or less`),
    })}
    onSubmit={values => {
      console.log('Form values:', values);
    }}>
    <Form>{children}</Form>
  </Formik>
);

export const Default: Story = {
  args: {
    name: 'example',
    label: 'Example Field',
  },
  render: args => (
    <FormikWrapper args={args}>
      <InputField {...args} />
    </FormikWrapper>
  ),
};

export const ErrorState: Story = {
  args: {
    name: 'exampleError',
    label: 'Field with Error',
  },
  render: args => (
    <Formik
      initialValues={{ [args.name]: '' }}
      initialErrors={{ [args.name]: 'This is an error' }}
      initialTouched={{ [args.name]: true }}
      onSubmit={() => {}}>
      <Form>
        <InputField {...args} />
      </Form>
    </Formik>
  ),
};
