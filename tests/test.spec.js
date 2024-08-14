const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { InventoryPage } = require('./pages/InventoryPage');
const { CartPage } = require('./pages/CartPage');
const { CheckoutPage } = require('./pages/CheckoutPage');

test('Login Bem-sucedido', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Adicionar Produto ao Carrinho', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart();
  const cartBadge = await page.$('.shopping_cart_badge');
  expect(cartBadge).not.toBeNull();
});

test('Remover Produto do Carrinho', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart();
  await inventoryPage.gotoCart();
  await cartPage.removeItem();
  expect(await cartPage.isEmpty()).toBe(true);
});

test('Finalizar Compra com Sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addToCart();
  await inventoryPage.gotoCart();
  await cartPage.checkout();
  await checkoutPage.fillCheckoutForm('Leonardo', 'Magalhães', '12345');
  await checkoutPage.completeCheckout();
  const confirmation = await checkoutPage.getConfirmationMessage();
  expect(confirmation).toBe('Thank you for your order!');
});

test('Ordenar Produtos por Preço (Menor para Maior)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.sortBy('lohi');
  const firstProductPrice = await page.locator('.inventory_item_price').first().textContent();
  const lastProductPrice = await page.locator('.inventory_item_price').last().textContent();
  expect(parseFloat(firstProductPrice.replace('$', ''))).toBeLessThan(parseFloat(lastProductPrice.replace('$', '')));
});

test('Visualizar Detalhes de um Produto', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.click('.inventory_item_name'); // Clica no primeiro produto
  await expect(page.locator('.inventory_details_name')).not.toBeNull();
});

test('Logout Bem-sucedido', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('Acesso Direto ao Carrinho Vazio', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await cartPage.gotoCart();
  expect(await cartPage.isEmpty()).toBe(true);
});