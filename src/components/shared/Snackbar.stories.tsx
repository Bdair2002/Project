import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SnackBar from './Snackbar';
import Button from '@mui/material/Button';
import { SnackbarState } from '../../redux/slices/snackbarSlice';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

export const MockedState: SnackbarState = {
  isOpen: true,
  severity: 'info',
  variant: 'standard',
  title: 'Title',
  message: 'Message',
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
  autoHideDuration: null,
};

const Mockstore = ({
  SnackbarState,
  children,
}: {
  SnackbarState: SnackbarState;
  children: React.ReactNode;
}) => {
  const store = configureStore({
    reducer: {
      snackbar: createSlice({
        name: 'snackbar',
        initialState: SnackbarState,
        reducers: {},
      }).reducer,
    },
  });

  return <Provider store={store}>{children}</Provider>;
};

const meta: Meta<SnackbarState> = {
  component: SnackBar,
  title: 'Components/Snackbar',
  excludeStories: /.*MockedState$/,
  argTypes: {
    isOpen: { control: 'boolean' },
    severity: { control: 'select', options: ['success', 'info', 'warning', 'error'] },
    variant: { control: 'select', options: ['standard', 'filled', 'outlined'] },
    title: { control: 'text' },
    message: { control: 'text' },
    anchorOrigin: { control: 'object' },
    autoHideDuration: { control: 'number' },
    icon: { control: 'object' },
    action: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<SnackbarState>;

export const Default: Story = {
  decorators: [Story => <Mockstore SnackbarState={MockedState}>{Story()}</Mockstore>],
};
export const successSnackbar: Story = {
  decorators: [
    Story => (
      <Mockstore SnackbarState={{ ...MockedState, severity: 'success' }}>{Story()}</Mockstore>
    ),
  ],
};
export const errorSnackbar: Story = {
  decorators: [
    Story => <Mockstore SnackbarState={{ ...MockedState, severity: 'error' }}>{Story()}</Mockstore>,
  ],
};
export const withAction: Story = {
  decorators: [
    Story => (
      <Mockstore
        SnackbarState={{
          ...MockedState,
          action: <Button color="secondary">Action</Button>,
        }}>
        {Story()}
      </Mockstore>
    ),
  ],
};
