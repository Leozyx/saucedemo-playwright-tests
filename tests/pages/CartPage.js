class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItem = '.cart_item';
    this.checkoutButton = 'text=Checkout';
    this.removeButton = 'text=Remove';
    this.cartIcon = '.shopping_cart_link';
  }

  async removeItem() {
    await this.page.click(this.removeButton);
  }

  async checkout() {
    await this.page.click(this.checkoutButton);
  }

  async isEmpty() {
    const items = await this.page.$$(this.cartItem);
    return items.length === 0;
  }

  async gotoCart() {
    await this.page.click(this.cartIcon);
  }
}

module.exports = { CartPage };