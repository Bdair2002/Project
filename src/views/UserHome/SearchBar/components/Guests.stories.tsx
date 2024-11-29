// src/components/Guests.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Guests from './guests';

const meta: Meta<typeof Guests> = {
  title: 'Components/Guests',
  component: Guests,
};

export default meta;

type Story = StoryObj<typeof Guests>;

export const Default: Story = {
  args: {
    guests: {
      adults: 2,
      children: 1,
      rooms: 1,
    },
  },
};
