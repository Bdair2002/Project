import { screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthenticationRequestBody } from '../api/types';

import { waitFor } from '@testing-library/react';
/* Getters */
export const getInput = (label: string) => screen.getByLabelText(new RegExp(`^${label}`, 'i'));
export const getButton = (name: string) =>
  screen.getByRole('button', {
    name: new RegExp(`^${name}`, 'i'),
  });
/* Actions */

export const fillUserForm = (user: AuthenticationRequestBody) => {
  const passwordInput = getInput('password');
  const userNameInput = getInput('username');
  userEvent.type(passwordInput, user.password || '');
  userEvent.type(userNameInput, user.userName || '');
};

export const fillSearchForm = (search: { city: string }) => {
  const searchInput = screen.getByPlaceholderText('Search for hotels, cities...');
  userEvent.type(searchInput, search.city);
};

export const loginUser = async (user: AuthenticationRequestBody) => {
  fillUserForm(user);
  const loginBtn = getButton('Sign In');

  await act(async () => {
    userEvent.click(loginBtn);
  });
};

export const typeInput = (input: HTMLElement, value: string) => {
  userEvent.type(input, value);
  userEvent.click(document.body);
};

export const clearInput = (input: HTMLElement) => {
  userEvent.clear(input);
  userEvent.click(document.body);
};
