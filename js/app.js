'use strict';

var oldItems = [];
var newItems = [];
Item.allItems = [];


function Item(filepath, alt) {
  this.filepath = filepath;
  this.alt = alt;
  Item.allItems.push(this);
}

new Item('img/bag.jpg','Bag');
new Item('img/banana.jpg','Banana');
new Item('img/bathroom.jpg','Bathroom');
new Item('img/boots.jpg','Boots');
new Item('img/breakfast.jpg','Breakfast');
new Item('img/bubblegum.jpg','Bubble Gum');
new Item('img/chair.jpg','Chair');
new Item('img/cthulhu.jpg','Cthulhu');
new Item('img/dog-duck.jpg','Dog Duck');
new Item('img/dragon.jpg','Dragon');
new Item('img/pen.jpg','Pen');
new Item('img/pet-sweep.jpg','Pet Sweep');
new Item('img/scissors.jpg','Scissors');
new Item('img/shark.jpg','Shark');
new Item('img/sweep.png','Sweep');
new Item('img/tauntaun.jpg','Tauntaun');
new Item('img/unicorn.jpg','Unicorn');
new Item('img/usb.gif','USB');
new Item('img/water-can.jpg','Water can');
new Item('img/wine-glass.jpg','Wine Glass');

var imgEl = document.getElementById('itemPics');
var imgElOne = document.getElementById('itemPicOne');
var imgElTwo = document.getElementById('itemPicTwo');
var imgElThree = document.getElementById('itemPicThree');

imgEl.addEventListener('click', render);

function render() {
  newItems = [];
  genOne();
  genTwo();
  genThree();
  oldItems = newItems;
}

function randomItem() {
  var randomIndex = Math.floor(Math.random() * Item.allItems.length);
  return Item.allItems[randomIndex];
}

function genOne() {
  var rOne = randomItem();
  var isValid = compareItems(rOne, oldItems, newItems);
  if(isValid === false) {
    imgElOne.src = rOne.filepath;
    newItems.push(rOne);
  } else {
    genOne();
  }
}

function genTwo() {
  var rTwo = randomItem();
  var isValid = compareItems(rTwo, oldItems, newItems);
  if(isValid === false) {
    imgElTwo.src = rTwo.filepath;
    newItems.push(rTwo);
  } else {
    genTwo();
  }
}

function genThree() {
  var rThree = randomItem();
  var isValid = compareItems(rThree, oldItems, newItems);
  if(isValid === false) {
    imgElThree.src = rThree.filepath;
    newItems.push(rThree);
  } else {
    genThree();
  }
}

function compareItems(randomItem, oldItems, newItems) {
  for(var i in oldItems) {
    if( randomItem === oldItems[i]) {
      return true;
    }
  }
  for(i in newItems) {
    if(randomItem === newItems[i]) {
      return true;
    }
  }
  return false;
}

render();