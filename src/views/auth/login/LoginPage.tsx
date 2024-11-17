import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Paper, Typography } from '@mui/material';
import InpuField from '../../../components/Formik/Input';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../../hooks/useAuth';

const initialValues = {
  username: '',
  password: '',
};

const LoginPage = () => {
  const auth = useAuth();

  const LoginSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values: { username: string; password: string }) => {
    const { username, password } = values;
    auth.login(username, password);
  };

  return (
    <Box
      component={Paper}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
      }}>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h3" sx={{ mt: 1, mb: 2 }}>
        Welcome Back 👋
      </Typography>
      <Formik initialValues={initialValues!} validationSchema={LoginSchema} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <InpuField
              disabled={auth.status === 'pending'}
              name="username"
              label="Username"
              autoComplete="username"
            />
            <InpuField
              disabled={auth.status === 'pending'}
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Typography variant="body2" color="error" align="left">
              {auth.error && 'Invalid username or password'}
            </Typography>
            <Box />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={auth.status === 'pending'}
              sx={{ mt: 3, mb: 2 }}>
              {auth.status === 'pending' ? 'Loading...' : 'Sign In'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginPage;
