import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import authReducer from './redux/slices/authSlice';
import router from './routers/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProviderContext from './context/ThereProvider';
const store = configureStore({
  reducer: { auth: authReducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});
export type RootState = ReturnType<typeof store.getState>;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProviderContext>
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  </ThemeProviderContext>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
