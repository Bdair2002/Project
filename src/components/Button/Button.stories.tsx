import { ComponentProps } from 'react';
import Button from './Button';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

type StoryProps = ComponentProps<typeof Button> & {
  label: string;
};

const meta: Meta<StoryProps> = {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'text'],
      control: { type: 'radio' },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
    color: {
      options: ['orange', 'green'],
      control: { type: 'radio' },
    },
  },
  args: {
    onClick: fn(),
  },
};
export default meta;
type Story = StoryObj<StoryProps>;
export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
    size: 'medium',
    color: 'orange',
  },
  render: ({ label, ...args }) => <Button {...args}>{label}</Button>,
};
export const secondary: Story = {
  args: {
    label: 'Secondary',
    variant: 'secondary',
    size: 'medium',
    color: 'green',
  },
  render: ({ label, ...args }) => <Button {...args}>{label}</Button>,
};
export const text: Story = {
  args: {
    label: 'Text',
    variant: 'text',
    size: 'medium',
    color: 'orange',
  },
  render: ({ label, ...args }) => <Button {...args}>{label}</Button>,
};
