import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SortByComponent from './SortBy';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const meta: Meta<typeof SortByComponent> = {
  title: 'Components/SortByComponent',
  component: SortByComponent,
};
export default meta;

type Story = StoryObj<typeof SortByComponent>;

export const Default: Story = {
  args: {
    onSortChange: (value: string) => {
      console.log(value);
    },
  },
};
