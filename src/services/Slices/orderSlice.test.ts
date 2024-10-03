import { expect } from '@jest/globals';
import { initialState, orderBurger, orderSlice } from './orderSlice';
import { ingredientsData } from './dataForTest';

describe('Тестирование редьюсера заказа', () => {
  const newOrder = {
    name: 'GGG',
    orders: [
      Object.assign(ingredientsData[0], { id: '1' }),
      Object.assign(ingredientsData[1], { id: '2' })
    ]
  };

  test('Тестирование pending', () => {
    const pending = {
      ...initialState,
      orderRequest: true
    };

    const action = {
      type: orderBurger.pending.type,
      payload: orderBurger
    };

    const orderState = orderSlice.reducer(initialState, action);
    expect(orderState).toStrictEqual(pending);
  });
  test('Тестирование fulfilled', () => {
    const fulfilled = {
      ...initialState,
      orderRequest: false,
      order: newOrder.orders,
      name: newOrder.name
    };

    const action = {
      type: orderBurger.fulfilled.type,
      payload: { order: newOrder.orders, name: newOrder.name }
    };

    const orderState = orderSlice.reducer(initialState, action);
    expect(orderState).toStrictEqual(fulfilled);
  });
  test('Тестирование rejected', () => {
    const rejected = {
      ...initialState,
      orderRequest: false
    };

    const action = {
      type: orderBurger.rejected.type,
      payload: orderBurger
    };

    const orderState = orderSlice.reducer(initialState, action);
    expect(orderState).toStrictEqual(rejected);
  });
});
