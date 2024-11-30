import { hideSnackbar, showSnackbar } from '../redux/slices/snackbarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectSnackBar } from '../selectors/SnackbarSelectors/SnackbarSelector';

const useSnackbar = () => {
  const snackbar = useSelector(selectSnackBar);
  const dispatch = useDispatch();

  const showSnackBar = (options: Parameters<typeof showSnackbar>[0]) => {
    dispatch(showSnackbar(options));
  };

  const hideSnackBar = () => {
    dispatch(hideSnackbar());
  };

  return {
    showSnackBar,
    hideSnackBar,
    ...snackbar,
  };
};

export default useSnackbar;
