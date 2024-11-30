import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './routers/AppRouter';
import ThemeProviderContext from './context/ThemeProvider';
import store from './redux/store/store';
import { HistoryContext, history } from './context/historyContext';
import GlobalSnackbar from './components/shared/Snackbar';
import Loader from './components/shared/Loader';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProviderContext>
    <HistoryContext.Provider value={history}>
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
        <GlobalSnackbar />
      </Provider>
    </HistoryContext.Provider>
  </ThemeProviderContext>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
