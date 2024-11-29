import render from '../../../tests/render';
import { screen, waitFor, waitForElementToBeRemoved, act } from '@testing-library/react';
import React from 'react';
import SearchBar from './SearchBar';
import * as getters from '../../../utils/testHelpers';
import { debug } from 'jest-preview';
import { wait } from '@testing-library/user-event/dist/utils';

window.scrollTo = jest.fn();
describe('Login Component', () => {
  beforeEach(() => {
    render(<SearchBar />);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('Search Operation', () => {
    it('should send a request with the given text inputs', async () => {
      debug();
      getters.fillSearchForm({ city: 'Ramallah' });
      expect(screen.getByPlaceholderText('Search for hotels, cities...')).toHaveValue('Ramallah');
    });
  });
});
