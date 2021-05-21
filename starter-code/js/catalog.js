/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

const selectElement = document.getElementById('items');
const quantityElement = document.getElementById('quantity');

let cartCount = 0;

const cartCountElem = document.getElementById('itemCount');

cartCountElem.innerHTML = cartCount;


function populateForm() {
  // On screen load, we call this method to put all of the busmall options
  // (the things in the Product.allProducts array) into the drop down list.
  //DONE: Add an <option> tag inside the form's select for each product
  for (let i in Product.allProducts) {
    let optionElem = document.createElement('option');
    optionElem.value = Product.allProducts[i].name;
    optionElem.innerHTML = Product.allProducts[i].name;
    selectElement.appendChild(optionElem);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  if (quantityElement.value > 0){

    // DONE: Prevent the page from reloading
    event.preventDefault();

    // Do all the things ...
    addSelectedItemToCart();
    cart.saveToLocalStorage();
    updateCounter();
    updateCartPreview();
  }
  else {
    alert('Quantity cannot be 0 or lower. Please try again.');
  }
}

// DONE: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
      // DONE: suss out the item picked from the select list
  let chosenProduct = selectElement.value;
  // DONE: get the quantity
  let chosenQuantity = quantityElement.value;
  // DONE: using those, add one item to the Cart
  cart.addItem(chosenProduct, chosenQuantity);
 
}

// DONE: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  cartCount ++; //incrementing our cartCount.

  cartCountElem.innerHTML = ''; // clearing the previous data

  cartCountElem.innerHTML = cartCount; // rendering the new cartcount value.

}

function updateCartPreview() {
  // DONE: Get the item and quantity from the form
  // Declared as a global function.

  // DONE: Add a new element to the cartContents div with that information
  let previewCart = document.getElementById('cartContents');
  previewCart.style.display = 'flex';

  let imgContainer = document.createElement('div');
  imgContainer.style.width = '120px';
  imgContainer.style.height = '120px';
  previewCart.appendChild(imgContainer);

  let imageElem = document.createElement('img');
    for (let i = 0; i < Product.allProducts.length; i++) {
      if (Product.allProducts[i].name === selectElement.value) {    
        imageElem.src = Product.allProducts[i].filePath;
        break;
      }
    }
    imageElem.style.width = '100%';
    console.log(Product.allProducts[0].filePath);
    imgContainer.appendChild(imageElem);

  let quantityElem = document.createElement('h');
  quantityElem.innerHTML = quantityElement.value;
  previewCart.appendChild(quantityElem);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);
  
// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
