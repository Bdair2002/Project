import { ComponentProps } from 'react';
import CustomForm from './Form';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import * as Yup from 'yup';

type StoryProps = ComponentProps<typeof CustomForm>;

const meta: Meta<StoryProps> = {
  title: 'CustomForm',
  component: CustomForm,
};
export default meta;
type Story = StoryObj<StoryProps>;
const storybookValidationSchema = Yup.object().shape({
  password: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
});
export const LoginForm: Story = {
  args: {
    initialValues: { email: '', password: '' },
    validationSchema: storybookValidationSchema,
    onSubmit: fn(),
    fields: [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Email',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Password',
      },
    ],
  },
  render: args => <CustomForm {...args} />,
};
