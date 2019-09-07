const expect = require('chai').expect;
const {head} = require('lodash');

const {FULL_COVERAGE, MEGA_COVERAGE, SPECIAL_FULL_COVERAGE, SUPER_SALE, OTHER_PRODUCT} = require('../config/constants');
const {CarInsurance, Product} = require('../src/coTest');

describe("Co Test", () => {
  
  describe('When degradate price for other products', () => {
    it('should validate that price is degradate x 2, when sellin is 0', () => {
      const coTest = new CarInsurance([new Product(OTHER_PRODUCT, 0, 2)]);
      const products = coTest.updatePrice();
      expect(head(products).price).equal(0);
    });
    it('should validate that price is degradate x 1, when sellin is mayor to 0', () => {
      const coTest = new CarInsurance([new Product(OTHER_PRODUCT, 1, 2)]);
      const products = coTest.updatePrice();
      expect(head(products).price).equal(1);
    });
    it('should validate that price never is mayor than 50, when this is updated', () => {
      const coTest = new CarInsurance([new Product(FULL_COVERAGE, 0, 50)]);
      const products = coTest.updatePrice();
      expect(head(products).price).equal(50);
    });
  });

  describe('When price never should negative', () => {
    it('should validate that price never is negative, when this is updated', () => {
      const coTest = new CarInsurance([new Product(OTHER_PRODUCT, 0, 0)]);
      const products = coTest.updatePrice();
      expect(head(products).price).equal(0);
    });
  });
  
  describe('When products is "Full Coverage"', () => {
    it('should validate "Full Coverage" actually increases in price the older it gets.', () => {
      const coTest = new CarInsurance([new Product(FULL_COVERAGE, 0, 1)]);
      const products = coTest.updatePrice();
      expect(head(products).price).equal(2);
    });
  });

  describe('When product is "MEga Coverage"', () => {
    it('should validate that price never change, when product is "Mega Coverage"', () => {
      const coTest = new CarInsurance([new Product(MEGA_COVERAGE, 0, 80)]);
      const products = coTest.updatePrice();
      expect(head(products).price).equal(80);
    });
  });

  describe('When product is "Special Full Coverage"', () => {
    it('should validate that price increase in 2 if have 10 days or minus, ', () => {
      const coTest = new CarInsurance([new Product(SPECIAL_FULL_COVERAGE, 10, 1)]);
      const products = coTest.updatePrice();
      expect(head(products).price).equal(3);
    });
    it('should validate that price increase in 3 if have 5 days or minus', () => {
      const coTest = new CarInsurance([new Product(SPECIAL_FULL_COVERAGE, 1, 1)]);
      const products = coTest.updatePrice();
      expect(head(products).price).equal(4);
    });
    it('should validate that price change to 0 when dont have more days', () => {
      const coTest = new CarInsurance([new Product(SPECIAL_FULL_COVERAGE, 0, 7)]);
      const products = coTest.updatePrice();
      expect(head(products).price).equal(0);
    });
  });

  describe('When product is "Super Sale"', () => {
    it('should validate that price degradate x 2 in comparision to normal product, when product is "Super Sale"', () => {
      const coTest = new CarInsurance([new Product(SUPER_SALE, 0, 8)]);
      const products = coTest.updatePrice();
      expect(head(products).price).equal(4);
    });
  });

  describe('When degradate sellIn for all products', () => {
    it('should validate that sellIn is degradate x 1, when product is "Normal Product"', () => {
      const coTest = new CarInsurance([new Product(OTHER_PRODUCT, 1, 2)]);
      const products = coTest.updatePrice();
      expect(head(products).sellIn).equal(0);
    });
    it('should validate that sellIn is degradate x 1, when product is "Full Coverage"', () => {
      const coTest = new CarInsurance([new Product(FULL_COVERAGE, 1, 2)]);
      const products = coTest.updatePrice();
      expect(head(products).sellIn).equal(0);
    });
    it('should validate that sellIn is degradate x 1, when product is "Special Full Coverage"', () => {
      const coTest = new CarInsurance([new Product(SPECIAL_FULL_COVERAGE, 1, 2)]);
      const products = coTest.updatePrice();
      expect(head(products).sellIn).equal(0);
    });
    it('should validate that sellIn is degradate x 1, when product is "Super Sale"', () => {
      const coTest = new CarInsurance([new Product(SUPER_SALE, 1, 2)]);
      const products = coTest.updatePrice();
      expect(head(products).sellIn).equal(0);
    });
    it('should validate that sellIn is not degradate, when product is "Mega Coverage"', () => {
      const coTest = new CarInsurance([new Product(MEGA_COVERAGE, 1, 2)]);
      const products = coTest.updatePrice();
      expect(head(products).sellIn).equal(1);
    });
  });
});
