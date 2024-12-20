import { useScrollTop } from '../../hooks/index';
import Button from '@mui/material/Button';
import { HistoryContext } from '../../context/historyContext';
import { styled } from '@mui/system';

const PageNotFound = () => {
  useScrollTop();
  return (
    <StyledContainer>
      <StyledMessage>
        <StyledIcon>😓</StyledIcon>
        <h1>Oops! Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <StyledButton
          onClick={() => {
            history.back();
          }}>
          Go Back 👈
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
  background: 'linear-gradient(135deg, #f4f7f6, #e3e9f1)',
  flexDirection: 'column',
  fontFamily: "'Roboto', sans-serif",
  color: '#333',
  textAlign: 'center',
  padding: '20px',
});

const StyledMessage = styled('div')({
  maxWidth: '600px',
  background: '#fff',
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  animation: 'fadeIn 0.5s ease-out',
});

const StyledIcon = styled('div')({
  fontSize: '4rem',
  marginBottom: '20px',
});

const StyledButton = styled(Button)({
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '25px',
  fontSize: '1rem',
  marginTop: '20px',
  textTransform: 'none',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

export default PageNotFound;
