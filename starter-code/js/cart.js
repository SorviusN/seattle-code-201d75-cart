/* global Cart */
'use strict';

const tbodyElem = document.querySelector('.table-body');
// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// DONE: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  tbodyElem.innerHTML = '';
  console.log('cart cleared');
  }

function showCart() {
  // DONE: Find the table body

  // DONE: Iterate over the items in the cart
  for (let a = 0; a < cart.items.length; a++){

    let trElem = document.createElement('tr');
    tbodyElem.appendChild(trElem);

    const xElem = document.createElement('td');
    xElem.innerHTML = 'X';
    xElem.setAttribute('id', cart.items[a].product);
    trElem.appendChild(xElem);

    const quantityElem = document.createElement('td');
    quantityElem.innerHTML = cart.items[a].quantity;
    trElem.appendChild(quantityElem);

    const nameElem = document.createElement('td');
    nameElem.innerHTML = cart.items[a].product;
    trElem.appendChild(nameElem);
  }
  // DONE: Create a TR
  // DONE: Create a TD for the delete link, quantity,  and the item
  // DONE: Add the TR to the TBODY and each of the TD's to the TR
}

function removeItemFromCart(event) {
  // Specifying which item to delete by using event.target

  console.log(event.target);

  let newArray = cart.items.filter(itemCart => itemCart.product !== event.target.id);
  console.log('new array ', newArray);

  cart.items = newArray; // Updating the cart.items array to not have the item that was clicked on.

  clearCart();
  cart.saveToLocalStorage();
  showCart();
}
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

// This will initialize the page and draw the cart on screen
renderCart();
