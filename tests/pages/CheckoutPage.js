class CheckoutPage {
    constructor(page) {
      this.page = page;
      this.firstNameInput = '#first-name';
      this.lastNameInput = '#last-name';
      this.postalCodeInput = '#postal-code';
      this.continueButton = 'text=Continue';
      this.finishButton = 'text=Finish';
      this.confirmationMessage = '.complete-header';
    }
  
    async fillCheckoutForm(firstName, lastName, postalCode) {
      await this.page.fill(this.firstNameInput, firstName);
      await this.page.fill(this.lastNameInput, lastName);
      await this.page.fill(this.postalCodeInput, postalCode);
    }
  
    async completeCheckout() {
      await this.page.click(this.continueButton);
      await this.page.click(this.finishButton);
    }
  
    async getConfirmationMessage() {
      return await this.page.textContent(this.confirmationMessage);
    }
  }

  module.exports = { CheckoutPage };