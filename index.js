const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();

app.use(cors());
const port = 3000;

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

//function for EndPoint 1:
function toAddProductInCart(cart, productId, name, price, quantity) {
  let newProduct = { productId, name, price, quantity };
  cart.push(newProduct);
  return cart;
}

//Endpoint 1: Add an Item to the Cart
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);

  result = toAddProductInCart(cart, productId, name, price, quantity);
  res.json({ cartItems: result });
});
//cart/add?productId=3&name=Tablet&price=15000&quantity=1

//function for EndPoint 2:
function toUpdateQuantityByProductId(cart, prductId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === prductId) {
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}

//Endpoint 2: Edit Quantity of an Item in the Cart
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);

  let result = toUpdateQuantityByProductId(cart, productId, quantity);
  res.json({ cartItems: result });
});
//cart/edit?productId=2&quantity=3

//function for EndPoint 3:
function toDeleteItemById(product, productId) {
  return product.productId !== productId;
}
//Endpoint 3: Delete an Item from the Cart
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);

  let result = cart.filter((product) => toDeleteItemById(product, productId));
  cart = result;
  res.json({ cartItems: cart });
});
//cart/delete?productId=1

//function for EndPoint 4:
function getCartItems(cart) {
  return cart; // Simply return the cart array
}

//Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  let result = getCartItems(cart);
  res.json({ cartItems: result });
});
//cart

//function for EndPoint 5:
function toCalculateTotalQuantityOfItem(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity = totalQuantity + cart[i].quantity;
  }
  return totalQuantity;
}
//Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity', (req, res) => {
  let result = toCalculateTotalQuantityOfItem(cart);
  res.json({ totalQuantity: result });
});
//cart/total-quantity

//function for EndPoint 6:
function toCalculateTotalPriceInCart(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}

//Endpoint 6: Calculate Total Price of Items in the Cart
app.get('/cart/total-price', (req, res) => {
  let result = toCalculateTotalPriceInCart(cart);

  res.json({ totalPrice: result });
});
//cart/total-price

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
