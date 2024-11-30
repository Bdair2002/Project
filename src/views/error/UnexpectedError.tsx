import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const UnexpectedErrorPage = () => {
  return (
    <StyledContainer>
      <StyledMessage>
        <StyledIcon>😱</StyledIcon>
        <h1>Oops! Something went wrong...</h1>
        <p>An unexpected error occurred. Please try again later.</p>
        <StyledButton
          onClick={() => {
            window.location.reload();
          }}>
          Reload Page 🔄
        </StyledButton>
      </StyledMessage>
    </StyledContainer>
  );
};

const StyledContainer = styled('div')({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #ff6f61, #ffb3ab)',
  flexDirection: 'column',
  fontFamily: "'Roboto', sans-serif",
  color: '#fff',
  textAlign: 'center',
  padding: '20px',
});

const StyledMessage = styled('div')({
  maxWidth: '600px',
  background: '#ffffff',
  color: '#333',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  animation: 'fadeIn 0.5s ease-out',
});

const StyledIcon = styled('div')({
  fontSize: '5rem',
  marginBottom: '20px',
});

const StyledButton = styled(Button)({
  backgroundColor: '#28a745',
  color: '#fff',
  padding: '12px 25px',
  borderRadius: '25px',
  fontSize: '1.2rem',
  marginTop: '20px',
  textTransform: 'none',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#218838',
  },
});

export default UnexpectedErrorPage;
