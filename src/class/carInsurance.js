const {updatePriceProducts} = require('../business/coTest');

class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }
  updatePrice() {
    updatePriceProducts(this.products);
    return this.products;
  };
}

module.exports = {
  CarInsurance
}