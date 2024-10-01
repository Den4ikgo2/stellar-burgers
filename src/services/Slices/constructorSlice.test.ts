import { expect } from '@jest/globals';
import {
  addInBasketBun,
  addInBasketIngredient,
  clearBurgerConstructor,
  constructorSlice,
  deleteBasketIngredient,
  initialState,
  moveBasketIngredient
} from './constructorSlice';

describe('Тестирование редьюсера конструктора', () => {
  const bun = {
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
  };

  const ingredients = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
    id: '2'
  };

  test('Тестирование начального состояния', () => {
    expect(constructorSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });
  test('Тестирование addInBasketIngredient', () => {
    const action = addInBasketIngredient(ingredients);
    expect(constructorSlice.reducer(initialState, action).ingredients).toEqual([
      ingredients
    ]);
  });
  test('Тестирование addInBasketBun', () => {
    const action = addInBasketBun(bun);
    expect(constructorSlice.reducer(initialState, action).bun).toEqual(bun);
  });
  test('Тестирование deleteBasketIngredient', () => {
    const actionAdd = addInBasketIngredient(ingredients);
    const actionRemove = deleteBasketIngredient(0);

    const stateIngredient = constructorSlice.reducer(
      constructorSlice.reducer(initialState, actionAdd),
      actionRemove
    );

    expect(stateIngredient.ingredients).toEqual([]);
  });
  test('Тестирование moveBasketIngredient, перемещение вверх', () => {
    const state = {
      ...initialState,
      ingredients: [bun, ingredients]
    };

    const newState = constructorSlice.reducer(
      state,
      moveBasketIngredient({ fromIngredient: 0, toIngredient: 0 + 1 })
    );
    expect(newState.ingredients).toEqual([ingredients, bun]);
  });
  test('Тестирование moveBasketIngredient, перемещение вниз', () => {
    const state = {
      ...initialState,
      ingredients: [bun, ingredients]
    };

    const newState = constructorSlice.reducer(
      state,
      moveBasketIngredient({ fromIngredient: 0 + 1, toIngredient: 0 })
    );
    expect(newState.ingredients).toEqual([ingredients, bun]);
  });
  test('Тестирование clearBurgerConstructor', () => {
    const state = {
      bun: bun,
      ingredients: [ingredients]
    };

    expect(constructorSlice.reducer(state, clearBurgerConstructor())).toEqual(
      initialState
    );
  });
});
