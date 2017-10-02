'use strict';
/* global $ */

const STORE = {
  items: [
    {name: 'apples', checked: false, editable: false},
    {name: 'oranges', checked: false, editable: false},
    {name: 'milk', checked: true, editable: false},
    {name: 'bread', checked: false, editable: false}
  ],
  hiddenChecked: false,
  searchTerm: null
};

function generateItemElement(item, itemIndex) {
  // generate HTML element for each item object
  
  let itemHtml = (
    `<span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}" editable>${item.name}</span>
    <div class="shopping-item-controls">
    <button class="shopping-item-toggle js-item-toggle">
    <span class="button-label">check</span>
    </button>
    <button class="shopping-item-delete js-item-delete">
    <span class="button-label">delete</span>
    </button>
    </div>`);
  
  if(item.editable){
    itemHtml = (
      `<form class=
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}" editable>${item.name}</span>
      <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
      <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
      <span class="button-label">delete</span>
      </button>
      </div>`);
  }
  return `<li class="js-item-index-element" 
  data-item-index="${itemIndex}">${itemHtml}</li>`;
}

function generateShoppingItemString (storeList) {
  //generate <li> strings from HTML
  console.log('Generating shopping list element');
  let items = storeList.map(function(item, itemIndex) {
    return generateItemElement(item, itemIndex);
  });
  return items.join('');
}

function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const listString = generateShoppingItemString(STORE.items);
  $('.js-shopping-list').html(listString);
}

function addItemToList(newItem) {
  console.log(`adding ${newItem} to list`);
  let newItemToAdd = {name: newItem, checked: false, editable: false};
  STORE.items.push(newItemToAdd);
}

function handleNewItemSubmit() {
  // listen for users adding a new shopping list item, then add
  // to list and render list 
  console.log('`handleNewItemSubmit` ran');
  $('#js-shopping-list-form').on('submit', event => {
    event.preventDefault();
    const newItem = $('.js-shopping-list-entry').val();  
    $('.js-shopping-list-entry').val('');
    addItemToList(newItem);
    renderShoppingList();
  });
}

function findItemIndex(currentTarget){
  //find item index from data-item-index attribute
  const selectedItemIndex = $(currentTarget)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(selectedItemIndex, 10);
}

function toggleItemChecked(itemIndex) {
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
  console.log(`Toggled ${STORE.items[itemIndex].name} to ${STORE.items[itemIndex].checked}`);
}

function handleItemCheckClicked() {
  // listen for users checking/unchecking list items, and
  // render them checked/unchecked accordingly
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = findItemIndex(event.currentTarget);
    toggleItemChecked(itemIndex);
    renderShoppingList();
  });
}

function deleteItemChecked(itemIndex){
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  // Listen for when users want to delete an item and 
  // delete it
  $('.js-shopping-list').on('click', '.js-item-delete', event => {    
    console.log('`handleDeleteItemClicked` ran');
    const itemIndex = findItemIndex(event.currentTarget);
    deleteItemChecked(itemIndex);
    renderShoppingList();
  });
}

function handleEditItem() {
  //make item editable when checked
}

function handleHideChecked() {
  //hide all items that are checked
}

function handleFilterSearch() {
  //filters shopping list based on keyword search
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditItem();
  handleHideChecked();
  handleFilterSearch();
}

$(handleShoppingList);
