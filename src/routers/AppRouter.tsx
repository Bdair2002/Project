import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import UserRouter from './UserRouter';
import { isAuthenticated } from './helpers';
import * as view from '../views/index';
import * as ROUTES from '../constants/routes';
import * as Layout from '../layout/index';
const history = createBrowserHistory();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* User Routes */}

      {/* Admin Routes */}

      {/* Public Routes */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <Layout.Center>
            <view.Login />
          </Layout.Center>
        }
        loader={async () => await isAuthenticated()}
      />
      <Route path="*" element={<view.NotFound history={history} />} />
    </Route>,
  ),
);

export default router;
