class InventoryPage {
    constructor(page) {
      this.page = page;
      this.addToCartButton = 'text=Add to cart';
      this.cartIcon = '.shopping_cart_link';
      this.sortDropdown = '.product_sort_container';
    }
  
    async addToCart() {
      await this.page.click(this.addToCartButton);
    }
  
    async gotoCart() {
      await this.page.click(this.cartIcon);
    }
  
    async sortBy(option) {
      await this.page.selectOption(this.sortDropdown, option);
    }
  }
  
  module.exports = { InventoryPage };