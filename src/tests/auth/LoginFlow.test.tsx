import render from '../render';
import React from 'react';
import { server } from '../__mocks__/server';
import * as getters from '../../utils/testHelpers';
import { screen } from '@testing-library/react';
import Login from '../../views/auth/login';
window.scrollTo = jest.fn();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Login Flow', () => {
  it('should show a welcome message after a successful user login', async () => {
    render(<Login />);
    await getters.loginUser({
      userName: 'user',
      password: 'user',
    });

    expect(screen.getByText(/Welcome Back Mazen/i)).toBeInTheDocument();
  });

  it('should show a welcome message after a successful admin login', async () => {
    render(<Login />);
    await getters.loginUser({
      userName: 'admin',
      password: 'admin',
    });

    expect(screen.getByText(/Welcome Back Mohamad/i)).toBeInTheDocument();
  });
});
