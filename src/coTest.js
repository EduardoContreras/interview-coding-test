const {map, eq, set, includes} = require('lodash');
const {FULL_COVERAGE, SPECIAL_FULL_COVERAGE, MEGA_COVERAGE, SUPER_SALE} = require('../config/constants');

class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }
}

const priceWhenProductIsSpecialFullCoverage = product => {
  if(includes([6,7,8,9,10], product.sellIn)) {
    return product.price + 2;
  } else if(includes([1,2,3,4,5], product.sellIn)) {
    return product.price + 3;
  } else if(eq(product.sellIn, 0)) {
    return 0;
  }
};
const updateSellInOfProduct = (product, newSellIn) => set(product, 'sellIn', newSellIn);
const updatePriceOfProduct = (product, newPrice) => set(product, 'price', newPrice >= 0 && newPrice <= 50 ? newPrice : product.price);
const expirationDateHasPassed = sellIn => eq(sellIn, 0) || sellIn < 0;
const discountPriceOtherProducts = ({sellIn}) => expirationDateHasPassed(sellIn) ? 2 : 1;

class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }
  updatePrice() {
    map(this.products, product => {
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
    });
    return this.products;
  };
}

module.exports = {
  Product,
  CarInsurance
}
