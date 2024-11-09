import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DOMElement } from 'react';
type User = {
  email: string;
  password: string;
};

/* Getters */

export const getInput = (label: string) => screen.getByLabelText(new RegExp(`^${label}`, 'i'));
export const getSignUpButton = () =>
  screen.getByRole('button', {
    name: /Sign up/i,
  });

/* Actions */

export const fillUserForm = (user: User) => {
  const emailInput = getInput('Email Address');
  const passwordInput = getInput('Password');
  const userNameInput = getInput('User Name');
  userEvent.type(emailInput, user.email);
  userEvent.type(passwordInput, user.password);
};

export const signUpUser = async (user: User) => {
  fillUserForm(user);
  const signUpButton = getSignUpButton();
  await act(async () => {
    userEvent.click(signUpButton);
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
