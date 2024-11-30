import { configureStore } from '@reduxjs/toolkit';
import createDataSlice from './sliceGenerator';

describe('createDataSlice', () => {
  type MockDataType = { id: number; name: string };

  const sliceName = 'mockData';
  const mockSlice = createDataSlice<MockDataType>(sliceName);
  const { actions, reducer } = mockSlice;

  // Smoke Tests
  describe('Smoke Tests', () => {
    it('should create a slice with the expected structure', () => {
      expect(mockSlice).toHaveProperty('name', sliceName);
      expect(mockSlice).toHaveProperty('reducer');
      expect(mockSlice).toHaveProperty('actions');
      expect(mockSlice.actions).toHaveProperty('getData');
      expect(mockSlice.actions).toHaveProperty('getDataSuccess');
      expect(mockSlice.actions).toHaveProperty('getDataFailure');
    });

    it('should have an initial state with expected properties', () => {
      const initialState = {
        data: [],
        status: 'idle',
        error: null,
      };
      const state = reducer(undefined, { type: '' });
      expect(state).toEqual(initialState);
    });
  });

  // Reducers Tests
  describe('Reducers', () => {
    it('should handle getData action', () => {
      const initialState = {
        data: [],
        status: 'idle',
        error: null,
      };

      const newState = reducer(initialState, actions.getData());
      expect(newState).toEqual({
        data: [],
        status: 'pending',
        error: null,
      });
    });

    it('should handle getDataSuccess action', () => {
      const initialState = {
        data: [],
        status: 'idle',
        error: null,
      };

      const mockData: MockDataType[] = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];

      const newState = reducer(initialState, actions.getDataSuccess(mockData));
      expect(newState).toEqual({
        data: mockData,
        status: 'success',
        error: null,
      });
    });

    it('should handle getDataFailure action', () => {
      const initialState = {
        data: [],
        status: 'idle',
        error: null,
      };

      const errorMessage = 'Failed to fetch data';
      const newState = reducer(initialState, actions.getDataFailure(errorMessage));
      expect(newState).toEqual({
        data: [],
        status: 'failure',
        error: errorMessage,
      });
    });
  });

  // Integration with Redux Store
  describe('Integration with Redux Store', () => {
    it('should dispatch actions and update the store state', () => {
      const store = configureStore({ reducer: { [sliceName]: reducer } });

      store.dispatch(actions.getData());
      expect(store.getState()[sliceName]).toEqual({
        data: [],
        status: 'pending',
        error: null,
      });

      const mockData: MockDataType[] = [{ id: 1, name: 'Item 1' }];
      store.dispatch(actions.getDataSuccess(mockData));
      expect(store.getState()[sliceName]).toEqual({
        data: mockData,
        status: 'success',
        error: null,
      });

      const errorMessage = 'Failed to fetch data';
      store.dispatch(actions.getDataFailure(errorMessage));
      expect(store.getState()[sliceName]).toEqual({
        data: [],
        status: 'failure',
        error: errorMessage,
      });
    });
  });
});
