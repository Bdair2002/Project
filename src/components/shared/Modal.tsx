import React, { FC, ReactNode } from 'react';
import { Box, Typography, Modal, Button, Divider } from '@mui/material';

export interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
}

const CustomModal: FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  children,
  showCloseButton = true,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
        {title && (
          <>
            {' '}
            <Typography variant="h6" component="h2" gutterBottom>
              {title}
            </Typography>
            <Divider sx={{ marginBottom: 1 }} />
          </>
        )}
        <Box
          sx={{
            maxHeight: 400,
            overflowY: 'auto',
            pr: 2,
            pt: 1,
          }}>
          {children}
        </Box>
        {showCloseButton && (
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;
