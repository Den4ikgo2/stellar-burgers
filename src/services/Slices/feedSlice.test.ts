import { expect } from '@jest/globals';
import { feedsSlice, getFeeds, initialState } from './feedSlice';
import { ordersData } from './dataForTest';

describe('Тестирование редьюсера ленты', () => {
  const feedsArray = {
    success: true,
    orders: ordersData,
    total: 54404,
    totalToday: 76
  };

  test('Тестирование pending', () => {
    const pending = {
      ...initialState,
      error: null,
      loading: true
    };

    const action = {
      type: getFeeds.pending.type,
      payload: feedsArray
    };

    const ingredientsState = feedsSlice.reducer(initialState, action);
    expect(ingredientsState).toStrictEqual(pending);
  });
  test('Тестирование fulfiled', () => {
    const fulfilled = {
      ...initialState,
      feeds: feedsArray,
      error: null,
      loading: false
    };

    const action = {
      type: getFeeds.fulfilled.type,
      payload: feedsArray
    };

    const ingredientsState = feedsSlice.reducer(initialState, action);
    expect(ingredientsState).toStrictEqual(fulfilled);
  });
  test('Тестирование rejected', () => {
    const rejected = {
      ...initialState,
      error: 'Ошибка',
      loading: false
    };

    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Ошибка' }
    };

    const ingredientsState = feedsSlice.reducer(initialState, action);
    expect(ingredientsState).toStrictEqual(rejected);
  });
});
