import { Theme } from '@mui/material/styles';
import useMuiMediaQuery from '@mui/material/useMediaQuery';

const useMediaQuery = () => {
  const isMobile = useMuiMediaQuery(theme => theme.breakpoints.down('sm'));
  const isTabletOrLess = useMuiMediaQuery(theme => theme.breakpoints.down('md'));
  const isDesktopOrLess = useMuiMediaQuery(theme => theme.breakpoints.down('lg'));
  const isLargeDesktop = useMuiMediaQuery(theme => theme.breakpoints.up('lg'));

  return {
    isMobile,
    isTabletOrLess,
    isDesktopOrLess,
    isLargeDesktop,
  };
};

export default useMediaQuery;
