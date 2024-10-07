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
import { ingredientsData } from './dataForTest';

describe('Тестирование редьюсера конструктора', () => {
  const bun = Object.assign(ingredientsData[0], { id: '1' });

  const ingredients = Object.assign(ingredientsData[1], { id: '2' });

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
