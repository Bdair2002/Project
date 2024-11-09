import render from '../../../../tests/render';
import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import LoginPage from '../LoginPage';
import axios from 'axios';
import * as getters from './helpers';
import { debug } from 'jest-preview';

describe('Login Component', () => {
  beforeEach(() => {
    render(<LoginPage />);
  });

  describe('Validation', () => {
    it('should have the submit button disabled for invalid form', async () => {
      debug();
      const signInButton = screen.getByRole('button', { name: /submit/i });
      expect(signInButton).toBeDisabled();
    });
    it('should have the submit button enabled for valid form', async () => {
      debug();
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      getters.typeInput(emailInput, 'something@test.com');
      getters.typeInput(passwordInput, 'password');
      const signInButton = screen.getByRole('button', { name: /submit/i });
      expect(signInButton).toBeEnabled();
    });
  });

  describe('Form Interaction', () => {
    it('should change email input displayed value on user input', async () => {
      debug();
      const emailInput = screen.getByLabelText(/email/i);
      getters.typeInput(emailInput, 'something@test.com');
      expect(emailInput).toHaveValue('something@test.com');
    });
    it('should change password input displayed value on user input', async () => {
      debug();
      const passwordInput = screen.getByLabelText(/password/i);
      getters.typeInput(passwordInput, 'password');
      expect(passwordInput).toHaveValue('password');
    });
  });
});
