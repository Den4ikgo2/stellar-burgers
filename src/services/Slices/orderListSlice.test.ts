import { expect } from '@jest/globals';
import { getOrderList, initialState, orderListSlice } from './orderListSlice';
import { ordersData } from './dataForTest';

describe('Тестирование редьюсера листа заказов', () => {
  const orders = ordersData;

  test('Тестирование fulfiled', () => {
    const fulfilled = {
      ...initialState,
      orders: orders
    };

    const action = {
      type: getOrderList.fulfilled.type,
      payload: orders
    };

    const ingredientsState = orderListSlice.reducer(initialState, action);
    expect(ingredientsState).toStrictEqual(fulfilled);
  });
});
