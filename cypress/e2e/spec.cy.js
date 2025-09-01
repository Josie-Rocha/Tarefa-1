describe('Teste de login', () => {  
  const baseUrl = 'https://www.saucedemo.com/';

  //Dado que o usuário está na página de login
  it('Login com sucesso', () => {
    cy.visit(baseUrl);

  //Quando preenche username e password válidos   
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");

  //E clica no botão de login  
    cy.get('#login-button').click();
  
  //E verifica se foi redirecionado para a página de produtos
    cy.url().should('include', '/inventory.html');

  // Então o login é realizado com sucesso  
  });

  //Dado que o usuário está na página de login
  it('Login com senha incorreta', () => {
    cy.visit(baseUrl);

  //Quando preenche username válido e password inválido 
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("Cafecomleite");
   
  //E clica no botão de login 
    cy.get('#login-button').click();

  // Então verifica se aparece mensagem de erro
    cy.get('[data-test="error"]').should('contain', 'Epic sadface:');
  });

  //Dado que o usuário está na página de login  
  it('Login com email inválido', () => {
    cy.visit(baseUrl);
  
  //Quando preenche username válido e password inválido   
    cy.get('[data-test="username"]').type("Salsicha123@Gmail.com");
    cy.get('[data-test="password"]').type("secret_sauce");

  //E clica no botão de login  
    cy.get('#login-button').click();

  // Então verifica se aparece mensagem de erro  
    cy.get('[data-test="error"]').should('contain', 'Epic sadface:');
  });

  //Dado que o usuário está na página de login 
  it('Login com email e senha em branco', () => {
    cy.visit(baseUrl);

  //Quando clica no botão de login  
    cy.get('#login-button').click();

  //Então verifica se aparece mensagem de campo obrigatório  
    cy.get('[data-test="error"]').should('contain', 'Username is required');
  });

  //Dado que o usuário está na página de login 
  it('Login sem senha', () => {
    cy.visit(baseUrl);

  //Quando preenche username válido  
    cy.get('[data-test="username"]').type("standard_user");

  //E clica no botão de login 
    cy.get('#login-button').click();

  // Então verifica se aparece mensagem de campo obrigatório   
    cy.get('[data-test="error"]').should('contain', 'Password is required');
  });
});

describe('adicionar e remover produto do carrinho de compras', () => {
  beforeEach(() => {
    // Dado que o usuário está na página de login
    cy.visit('https://www.saucedemo.com/');

    // Quando preenche os dados de login (username e password)
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");

    // E clica no botão "login"
    cy.get('#login-button').click();

    // Então, o usuário será redirecionado para página de produtos
    cy.url().should('include', 'inventory.html');
  });

  it('Adicionar item ao carrinho de compra', () => {
    // Dado que o usuário já está na página de produtos

    // Quando o usuário escolher o item e clica no "botão add to cart"
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Então o item vai para o carrinho de compra
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should('include', 'cart.html');
    cy.get('.cart_item').should('contain', 'Sauce Labs Backpack');
  });

  it('Remover item do carrinho de compra', () => {
    // Dado que o usuário já está na página de produtos

    // Quando o usuário escolher o item e clicar no "botão add to cart"
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // E o item vai para o carrinho de compra
    cy.get('[data-test="shopping-cart-link"]').click();

    // E o usuário for redirecionado para a página do carrinho de compra
    cy.url().should('include', 'cart.html');

    // E o usuário clicar no botão "Remove"
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();

    // Então, o item é retirado do carrinho de compra
    cy.get('.cart_item').should('not.exist');
  });
});
describe('Checkout', () => {
  it('Fazer uma compra até o checkout', () => {
    
    // Dado que o usuário está na página de login 
    cy.visit('https://www.saucedemo.com/');

    // Quando preenche os dados de login (username e password)
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");

    // E clica no botão "login"
    cy.get('#login-button').click();

    // E o usuário será redirecionado para página de produtos
    cy.url().should('include', 'inventory.html');

    // E o usuário escolher o item e clicar no "botão add to cart"
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // E o item vai para o carrinho de compra
    cy.get('[data-test="shopping-cart-link"]').click();

    // E clicar no botão checkout
    cy.get('[data-test="checkout"]').click();

    // E for redirecionado à página de preencher dados pessoais 
    cy.url().should('include', 'checkout-step-one.html');

    // E preencher first name, last name e zip code 
    cy.get('[data-test="firstName"]').type("Josie");
    cy.get('[data-test="lastName"]').type("Rocha");
    cy.get('[data-test="postalCode"]').type("2345777");

    // E clicar no botão continue
    cy.get('[data-test="continue"]').click();

    // E for encaminhado para a página de concluir a compra
    cy.url().should('include', 'checkout-step-two.html');

    // E clicar no botão finish para concluir a compra
    cy.get('[data-test="finish"]').click();

    // Então será redirecionado para a página final
    cy.url().should('include', 'checkout-complete.html');
  });
});