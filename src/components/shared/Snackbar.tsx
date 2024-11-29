import AlertTitle from '@mui/material/AlertTitle';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import React from 'react';
import useSnackbar from '../../hooks/useSnackbar';
import Alert from '@mui/material/Alert';

const SnackBar = () => {
  const snackbar = useSnackbar();

  const handleClose = (_event?: React.SyntheticEvent | Event) => {
    snackbar.hideSnackBar();
  };

  return (
    <Stack gap={2} sx={{ width: '100%' }}>
      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={snackbar.autoHideDuration}
        anchorOrigin={snackbar.anchorOrigin}
        onClose={handleClose}
        TransitionComponent={Slide}>
        <Alert
          icon={snackbar.icon}
          variant={snackbar.variant}
          severity={snackbar.severity}
          onClose={handleClose}
          action={snackbar.action}
          sx={{ width: '100%' }}>
          {snackbar.title && <AlertTitle>{snackbar.title}</AlertTitle>}
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackBar;
