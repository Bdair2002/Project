import { ComponentProps } from 'react';
import Input from './Input';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

type StoryProps = ComponentProps<typeof Input>;

const meta: Meta<StoryProps> = {
  title: 'Input',
  component: Input,
};
export default meta;
type Story = StoryObj<StoryProps>;
export const TextInput: Story = {
  args: {
    name: 'text',
    id: 'email',
    type: 'email',
    placeholder: 'Email',
    value: '',
    onChange: fn(),
    onBlur: fn(),
    className: '',
  },
  render: args => <Input {...args} />,
};
export const PasswordInput: Story = {
  args: {
    name: 'password',
    id: 'password',
    type: 'password',
    placeholder: 'Password',
    value: '',
    onChange: fn(),
    onBlur: fn(),
    className: '',
  },
  render: args => <Input {...args} />,
};
