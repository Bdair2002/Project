import { render, RenderOptions } from '@testing-library/react';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { HistoryContext, history } from '../context/historyContext';
import ThemeProviderContext from '../context/ThemeProvider';
import store from '../redux/store/store';
import GlobalSnackbar from '../components/shared/Snackbar';
import Loader from '../components/shared/Loader';

type WrapperProps = {
  children: React.ReactNode;
};

const testRender = (
  Component: React.ReactElement,
  {
    route = '/',
    initialEntries = [route],
    ...options
  }: RenderOptions & { route?: string; initialEntries?: string[] } = {},
) => {
  function Wrapper({ children }: WrapperProps) {
    return (
      <Provider store={store}>
        <ThemeProviderContext>
          <HistoryContext.Provider value={history}>
            <MemoryRouter initialEntries={initialEntries}>
              <Suspense fallback={<Loader />}>{children}</Suspense>
            </MemoryRouter>
            <GlobalSnackbar />
          </HistoryContext.Provider>
        </ThemeProviderContext>
      </Provider>
    );
  }

  return render(Component, { wrapper: Wrapper, ...options });
};

export default testRender;
