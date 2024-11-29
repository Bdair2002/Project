import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CustomModal, { CustomModalProps } from './Modal';
import { Button } from '@mui/material';
import { useState } from 'react';

export default {
  title: 'Components/CustomModal',
  component: CustomModal,
  argTypes: {
    onClose: { action: 'onClose' },
    open: { control: 'boolean' },
    title: { control: 'text' },
    showCloseButton: { control: 'boolean' },
    children: { control: 'text' },
  },
} as Meta;

export const Default: StoryObj<CustomModalProps> = {
  args: {
    open: true,
    title: 'Modal Title',
    children: 'This is the modal content.',
    showCloseButton: true,
  },
};

export const WithoutTitle: StoryObj<CustomModalProps> = {
  args: {
    open: true,
    title: '',
    children: 'This is the modal content without a title.',
    showCloseButton: true,
  },
};

export const WithoutCloseButton: StoryObj<CustomModalProps> = {
  args: {
    open: true,
    title: 'Modal Without Close Button',
    children: 'This modal does not have a close button.',
    showCloseButton: false,
  },
};

export const WithOpenButton: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <Button variant="contained" onClick={handleOpen}>
          Open Modal
        </Button>
        <CustomModal open={open} onClose={handleClose} title="Dynamic Modal">
          This modal is opened and closed by a button that changes the state.
        </CustomModal>
      </>
    );
  },
};
