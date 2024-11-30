import render from '../../../tests/render';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import LoginPage from './LoginPage';
import * as getters from '../../../utils/testHelpers';
import { debug } from 'jest-preview';
import { wait } from '@testing-library/user-event/dist/utils';

window.scrollTo = jest.fn();
describe('Login Component', () => {
  beforeEach(() => {
    render(<LoginPage />);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('Validation', () => {
    it('should have the submit button disabled for invalid form', async () => {
      debug();
      const signInButton = getters.getButton('Sign in');
      expect(signInButton).toBeDisabled();
    });
    it('should have the submit button enabled for valid form', async () => {
      getters.fillUserForm({ userName: 'user', password: 'password' });
      const signInButton = getters.getButton('Sign in');
      expect(signInButton).toBeEnabled();
    });
  });
  describe('Form Interaction', () => {
    it('should change email input displayed value on user input', async () => {
      const usernameInput = getters.getInput('username');
      getters.typeInput(usernameInput, 'user');
      expect(usernameInput).toHaveValue('user');
    });
    it('should change password input displayed value on user input', async () => {
      const passwordInput = getters.getInput('password');
      getters.typeInput(passwordInput, 'password');
      expect(passwordInput).toHaveValue('password');
    });
    it('should show an error message on invalid login', async () => {
      await getters.loginUser({ userName: 'invalid', password: 'invalid' });
      debug();
      await waitForElementToBeRemoved(() => getters.getButton('Loading...'));

      const errorMessage = screen.getByText('Invalid username or password');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
