'use strict';

var names = [];
var votes = [];
var oldItems = [];
var newItems = [];
Item.allItems = [];
Item.totalClicks = 0;

if(localStorage.getItem('storedVotes')){
  votes = JSON.parse(localStorage.getItem('storedVotes'));
} else {
  for(var i = 0; i < 24; i++){
    votes.push(0);
  }
  localStorage.setItem('storedVotes',JSON.stringify(votes));
}


function Item(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.votes = 0;
  this.timesDisplayed = 0;
  Item.allItems.push(this);
  names.push(this.name);
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

imgEl.addEventListener('click', handleclick);

function randomItem() {
  var randomIndex = Math.floor(Math.random() * Item.allItems.length);
  return Item.allItems[randomIndex];
}

function genOne() {
  var rOne = randomItem();
  var isValid = compareItems(rOne, oldItems, newItems);
  if(isValid === false) {
    imgElOne.src = rOne.filepath;
    imgElOne.alt = rOne.name;
    rOne.timesDisplayed++;
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
    imgElTwo.alt = rTwo.name;
    newItems.push(rTwo);
    rTwo.timesDisplayed++;
  } else {
    genTwo();
  }
}

function genThree() {
  var rThree = randomItem();
  var isValid = compareItems(rThree, oldItems, newItems);
  if(isValid === false) {
    imgElThree.src = rThree.filepath;
    imgElThree.alt = rThree.name;
    newItems.push(rThree);
    rThree.timesDisplayed++;
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

function handleclick(e) {
  Item.totalClicks++;
  for(var i in Item.allItems) {
    if(e.target.alt === Item.allItems[i].name) {
      Item.allItems[i].votes++;
    }
  }

  if(Item.totalClicks > 24) {
    imgEl.removeEventListener('click', handleclick);
    updateVotes();
    renderChart();
  } else {
    render();
  }
}

function updateVotes(){
  for(var i in Item.allItems) {
    votes[i] += Item.allItems[i].votes;
  }
  localStorage.setItem('storedVotes',JSON.stringify(votes));
}

function renderChart(){
  var context = document.getElementById('chart').getContext('2d');

  var chartColors = ['#cc65e'];

  var itemChart = new Chart(context, { // eslint-disable-line
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: 'Votes Per Item',
        data: votes,
        backgroundColors: chartColors,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  }) // eslint-disable-line
}

function render() {
  newItems = [];
  genOne();
  genTwo();
  genThree();
  oldItems = newItems;
}

render();