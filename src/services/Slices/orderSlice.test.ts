import { expect } from '@jest/globals';
import { initialState, orderBurger, orderSlice } from './orderSlice';

describe('Тестирование редьюсера заказа', () => {
  const newOrder = {
    name: 'GGG',
    orders: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
        id: '1'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0,
        id: '2'
      }
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
