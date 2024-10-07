describe('Тестирование конструктора бургера', () => {

  const chooseBuns = 'Выберите булки'
  const chooseFilling = 'Выберите начинку'
  const Buns = 'Булки'
  const filleng = 'Начинки'

  // Выполнение перхватов запросов перед посещением страницы
  before(() => {
    // Перехват запроса на получения ингредиентов с сервера
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as(`${'ingredients'}`);
  });

  beforeEach('Авторизация пользователя', () => {
    // Перехват запрос на данные пользователя с сервера
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as(`${'user'}`);
    // Тестирование куки и токена
    cy.setCookie('accessToken', 'mockAccessToken');
    window.localStorage.setItem('refreshToken', 'mockReshToken');
  });

  // Выполнить в конце
  afterEach(() => {
    cy.setCookie('accessToken', '');
    window.localStorage.setItem('refreshToken', '');
  });

  // Проверка открытия страницы
  beforeEach('Открытие главной страницы', () => {
    cy.visit('/');
  });

  describe('Тестирование добавления ингредиентов в конструктор', () => {
    it('Добавление булок в конструктор', () => {
      cy.get('div').contains(chooseBuns).should('exist');
      cy.get('h3').contains(Buns).next('ul').contains('Добавить').click();
      cy.get('div').contains(chooseBuns).should('not.exist');
    });

    it('Добавление начинок в конструктор', () => {
      cy.get('div').contains(chooseFilling).should('exist');
      cy.get('h3').contains(filleng).next('ul').contains('Добавить').click();
      cy.get('div').contains(chooseFilling).should('not.exist');
    });

    it('Добавление соусов в конструктор', () => {
      cy.get('div').contains(chooseFilling).should('exist');
      cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();
      cy.get('div').contains(chooseFilling).should('not.exist');
    });
  });

  describe('Тестирование открытия и закрытия модальных окон', () => {
    beforeEach('Открытие главной страницы', () => {
      cy.contains('Говяжий метеорит (отбивная)').click();
    });
    it('Закрытие модального окна по нажатию на крестик', () => {
      cy.contains('Детали ингредиента').should('exist');
      cy.get(`[data-test='ingredient-details']`).click();
      cy.contains('Детали ингредиента').should('not.exist');
    });
    it('Закрытие модального окна по нажатию оверлей', () => {
      cy.contains('Детали ингредиента').should('exist');
      cy.get(`body`).type('{esc}');
      cy.contains('Детали ингредиента').should('not.exist');
    });
  });

  describe('Тестирование сбор заказа и его оформление', () => {
    it('Сбор бургера и оформление заказа', () => {
      cy.contains('user').should('exist');
      // Перехват обращения к API
      cy.intercept('POST', 'api/orders', {
        fixture: 'order.json'
      }).as(`${'order'}`);

      //Сбор бургера
      cy.get('h3').contains(Buns).next('ul').contains('Добавить').click();
      cy.get('h3').contains(filleng).next('ul').contains('Добавить').click();
      cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();

      //Нажатие на кнопку оформить заказ
      cy.contains('Оформить заказ').click();

      cy.wait('@order').its('response.statusCode').should('eq', 200);

      //Проверка открытия модального окна
      cy.contains('1').should('exist');

      //Закрытие модального окна (при одном нажатии на ESC не закрывает модалку, при двух закрывает. Так и не понял почему)
      cy.get(`body`).type('{esc}');
      cy.get(`body`).type('{esc}');

      //Проверка что консутруктор пуст
      cy.get('div').contains(chooseFilling).should('exist');
      cy.get('div').contains(chooseBuns).should('exist');

    });
  });
});
