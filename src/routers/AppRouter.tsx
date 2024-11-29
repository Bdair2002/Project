import { Route, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import UserRouter from './UserRouter';
import AdminRouter from './AdminRouter';
import * as view from '../views/index';
import * as ROUTES from '../constants/routes';
import Cookies from 'js-cookie';
import { UserHomeLayout, AdminLayout } from '../layout';
import React, { Suspense } from 'react';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* Default Route based on Authentication */}
      <Route index element={<Navigate to={Cookies.get('jwt') ? ROUTES.HOME : ROUTES.LOGIN} />} />

      {/* User Routes */}
      <Route element={<UserHomeLayout />}>
        <Route element={<UserRouter />}>
          <Route path={ROUTES.HOME} element={<view.UserHome />} />
        </Route>

        <Route element={<UserRouter />}>
          <Route path={ROUTES.SEARCH} element={<view.SearchResultsPage />} />
        </Route>

        <Route element={<UserRouter />}>
          <Route path={ROUTES.HOTEL} element={<view.HotelPage />} />
        </Route>
        <Route element={<UserRouter />}>
          <Route path={ROUTES.CART} element={<view.CartPage />} />
        </Route>
        <Route element={<UserRouter />}>
          <Route path={ROUTES.BOOKING_CONFIRMATION} element={<view.BookingConfirmation />} />
        </Route>
      </Route>

      {/* Public Routes */}
      <Route path={ROUTES.LOGIN} element={<view.Login />} />
      <Route path="*" element={<view.NotFound />} />

      {/* Admin Routes */}
      <Route path={ROUTES.ADMIN} element={<AdminLayout />}>
        <Route element={<AdminRouter />}>
          <Route index element={<view.AdminMain />} />
          <Route path={ROUTES.CITIES} element={<view.AdminCities />} />
          <Route path={ROUTES.HOTELS} element={<view.AdminHotels />} />
          <Route path={ROUTES.ROOMS} element={<view.AdminRooms />} />
        </Route>
      </Route>
    </Route>,
  ),
);

export default router;
