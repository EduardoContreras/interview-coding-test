const fs = require('fs');
const StringBuffer = require('stringbuffer');
const { CarInsurance } = require('../class/carInsurance');
const { Product } = require('../class/product');

const productsAtDayZero = [
  new Product('Medium Coverage', 10, 20),
  new Product('Full Coverage', 2, 0),
  new Product('Low Coverage', 5, 7),
  new Product('Mega Coverage', 0, 80),
  new Product('Mega Coverage', -1, 80),
  new Product('Special Full Coverage', 15, 20),
  new Product('Special Full Coverage', 10, 49),
  new Product('Special Full Coverage', 5, 49),
  new Product('Super Sale', 3, 6),
];

const createFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    if (err) console.log(err);
    console.log(`${fileName} was created`);
  });
};

const deleteFile = (fileName, cb) => {
  fs.unlink(fileName, (err) => {
    if (err) console.log(err);
    console.log(`${fileName} was deleted`);
    cb();
  });
};

const startCreationFile = (fileName, data) => {
  fs.access(fileName, fs.constants.F_OK, (err) => {
    console.log(`${fileName} ${err ? 'does not exist' : 'exists'}`);
    if (!err) {
      deleteFile(fileName, () => { createFile(fileName, data); });
    } else {
      createFile(fileName, data);
    }
  });
};

const productData = (product, stringBuffer) => stringBuffer.append('\n').append(`${product.name}, ${product.sellIn}, ${product.price}`);

const formatData = (day, stringBuffer, carInsurance) => {
  stringBuffer.append(`-------- day ${day} --------`).append('\n');
  stringBuffer.append('NAME, SELLIN, PRICE');
  carInsurance.updatePrice().map((product) => productData(product, stringBuffer));
  stringBuffer.append('\n').append('').append('\n');
};

const dataToFile = () => {
  const carInsurance = new CarInsurance(productsAtDayZero);
  const stringBuffer = new StringBuffer();
  [...Array(30).keys()].map((day) => formatData(day + 1, stringBuffer, carInsurance));
  return stringBuffer;
};

startCreationFile('products_after_30_days.txt', dataToFile());
