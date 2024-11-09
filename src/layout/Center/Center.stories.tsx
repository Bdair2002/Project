import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Center from './Center';
import LoginPage from '../../views/auth/login';
type StoryProps = ComponentProps<typeof Center>;

const meta: Meta<StoryProps> = {
  title: 'Layout/Center',
  component: Center,
};
export default meta;
type Story = StoryObj<StoryProps>;
export const Screen: Story = {
  render: args => (
    <Center>
      <LoginPage />
    </Center>
  ),
};
