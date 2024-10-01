import { expect } from '@jest/globals';
import { getOrderList, initialState, orderListSlice } from './orderListSlice';

describe('Тестирование редьюсера листа заказов', () => {
  const orders = [
    {
      _id: '66fc132b07cc0b001c1d52a6',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0944',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный традиционный-галактический био-марсианский бургер',
      createdAt: '2024-10-01T15:20:11.113Z',
      updatedAt: '2024-10-01T15:20:12.407Z',
      number: 54778
    },
    {
      _id: '66fc116607cc0b001c1d52a2',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный антарианский бургер',
      createdAt: '2024-10-01T15:12:38.236Z',
      updatedAt: '2024-10-01T15:12:38.999Z',
      number: 54777
    },
    {
      _id: '66fc082807cc0b001c1d527f',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Астероидный флюоресцентный spicy метеоритный бургер',
      createdAt: '2024-10-01T14:33:13.000Z',
      updatedAt: '2024-10-01T14:33:17.723Z',
      number: 54776
    }
  ];

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
