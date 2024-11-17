import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import LoginPage from './LoginPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../redux/slices/authSlice';

// Mock Redux store setup
const createMockStore = (authState: any) =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: authState,
    },
  });

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  tags: ['autodocs'],
  decorators: [
    Story => {
      const store = createMockStore({
        user: null,
        token: null,
        status: 'idle',
        error: null,
      });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {
  args: {},
};

export const Loading: Story = {
  args: {},
  decorators: [
    Story => {
      const store = createMockStore({
        user: null,
        token: null,
        status: 'pending',
        error: null,
      });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};

export const ErrorState: Story = {
  args: {},
  decorators: [
    Story => {
      const store = createMockStore({
        user: null,
        token: null,
        status: 'failure',
        error: 'Invalid username or password',
      });

      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};
