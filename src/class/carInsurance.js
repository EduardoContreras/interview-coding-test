const {updatePriceProducts} = require('../coTest');

class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }
  updatePrice() {
    updatePriceProducts(this.products);
    /* map(this.products, product => {
      if(!eq(product.name, MEGA_COVERAGE)) {
        if(eq(product.name, FULL_COVERAGE)) {
          updatePriceOfProduct(product, product.price + 1);
        } else if(eq(product.name, SPECIAL_FULL_COVERAGE)) {
          updatePriceOfProduct(product, priceWhenProductIsSpecialFullCoverage(product));
        } else if(eq(product.name, SUPER_SALE)) {
          updatePriceOfProduct(product, product.price - 4);
        } else {
          updatePriceOfProduct(product, product.price - discountPriceOtherProducts(product));
        }
        updateSellInOfProduct(product, product.sellIn - 1);
      }
    }); */
    return this.products;
  };
}

module.exports = {
  CarInsurance
}