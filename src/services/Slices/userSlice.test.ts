import { expect } from '@jest/globals';
import { checkUser, initialState, loginUser, logOut, registerUser, updateUser, userSlice } from './userSlice';
import { error } from 'console';

describe('Тестирование редьюсера пользователя', () => {
  const user = {
    user: {
      name: 'ПАМАГИТЕ',
      email: 'МЕНЯ НЕ ОСТАНОВИТЬ'
    }
  };

  const emptyUser = {
    user: {
      name: '',
      email: ''
    }
  };

  test('Тестирование pending, при нажатии на регистрацию', () => {
    const pending = {
      ...initialState,
      error: null
    };
    const action = {
      type: registerUser.pending.type,
      payload: registerUser
    };
    const userState = userSlice.reducer(initialState, action);
    expect(userState).toStrictEqual(pending);
  });
  test('Тестирование fulfilled, при нажатии на регистрацию', () => {
    const fulfilled = {
      ...initialState,
      error: null,
      isAuthChecked: true,
      user: user.user
    };
    const action = {
      type: registerUser.fulfilled.type,
      payload: user
    };
    const userState = userSlice.reducer(initialState, action);
    expect(userState).toStrictEqual(fulfilled);
  });
  test('Тестирование rejected, при нажатии на регистрацию', () => {
    const rejected = {
        ...initialState,
        error: 'Ошибка',
        isAuthChecked: false,
      };
      const action = {
        type: registerUser.rejected.type,
        error: {message: "Ошибка"}
      };
      const userState = userSlice.reducer(initialState, action);
      expect(userState).toStrictEqual(rejected);
  });
  test('Тестирование pending, проверка регистрации позователя', () => {
    const pending = {
        ...initialState,
        isAuthChecked: false,
      };
      const action = {
        type: checkUser.pending.type,
        payload: checkUser
      };
      const userState = userSlice.reducer(initialState, action);
      expect(userState).toStrictEqual(pending);
  });
  test('Тестирование fulfilled, проверка регистрации позователя', () => {
    const fulfilled = {
        ...initialState,
        isAuthChecked: true,
      };
      const action = {
        type: checkUser.fulfilled.type,
        payload: emptyUser
      };
      const userState = userSlice.reducer(initialState, action);
      expect(userState).toStrictEqual(fulfilled);
  });
  test('Тестирование rejected, проверка регистрации позователя', () => {
    const rejected = {
        ...initialState,
        isAuthChecked: false,
        error: 'Ошибка'
      };
      const action = {
        type: checkUser.rejected.type,
        error: {message: 'Ошибка'}
      };
      const userState = userSlice.reducer(initialState, action);
      expect(userState).toStrictEqual(rejected);
  });
  test('Тестирование pending, нажатие на кнопку войти', () => {
    const pending = {
        ...initialState,
        isAuthChecked: false,
      };
      const action = {
        type: loginUser.pending.type,
        payload: loginUser
      };
      const userState = userSlice.reducer(initialState, action);
      expect(userState).toStrictEqual(pending);
  });
  test('Тестирование fulfilled, нажатие на кнопку войти', () => {
    const fulfilled = {
        ...initialState,
        isAuthChecked: true,
        user: user.user
      };
      const action = {
        type: loginUser.fulfilled.type,
        payload: user
      };
      const userState = userSlice.reducer(initialState, action);
      expect(userState).toStrictEqual(fulfilled);
  });
  test('Тестирование rejected, нажатие на кнопку войти', () => {
    const rejected = {
        ...initialState,
        isAuthChecked: false,
        error: 'Ошибка'
      };
      const action = {
        type: loginUser.rejected.type,
        error: {message: 'Ошибка'}
      };
      const userState = userSlice.reducer(initialState, action);
      expect(userState).toStrictEqual(rejected);
  });
  test('Тестирование pending, обновление информации о пользователе', () => {
    const pending = {
        ...initialState,
      };
      const action = {
        type: updateUser.pending.type,
        payload: updateUser
      };
      const userState = userSlice.reducer(initialState, action);
      expect(userState).toStrictEqual(pending);
  });
  test('Тестирование fulfilled, обновление информации о пользователе', () => {
    const fulfilled = {
        ...initialState,
        isAuthChecked: true,
        user: user.user
      };
      const action = {
        type: updateUser.fulfilled.type,
        payload: user
      };
      const userState = userSlice.reducer(initialState, action);
      expect(userState).toStrictEqual(fulfilled);
  });
  test('Тестирование rejected, обновление информации о пользователе', () => {
    const rejected = {
        ...initialState,
        isAuthChecked: false,
        error: 'Ошибка'
      };
      const action = {
        type: updateUser.rejected.type,
        error: {message: 'Ошибка'}
      };
      const userState = userSlice.reducer(initialState, action);
      expect(userState).toStrictEqual(rejected);
  });
  test('Тестирование fulfilled, выход из апрофиля', () => {
    const fulfilled = {
        ...initialState,
        isAuthChecked: false,
      };
      const action = {
        type: logOut.fulfilled.type,
        payload: emptyUser
      };
      const userState = userSlice.reducer(initialState, action);
      expect(userState).toStrictEqual(fulfilled);
  });
});
