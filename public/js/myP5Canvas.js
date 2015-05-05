

$(document).ready(function() {
  //anything that needs to load AFTER the page has loaded...
  console.log("loaded myP5Canvas");
});


var img;
var x = 0;
var y = 0;
var jsonData = {};

// socket.on('initData', function (data) {
//   console.log('got init data: '+JSON.stringify(data));
  
// });

  function init() { window.parent.setUpFrame(); return true; }
  function yourMethod(_jsonData) { 
    jsonData = _jsonData;

    console.log('got jsonData: '+JSON.stringify(jsonData, null, '\t')); 

  }

function setup() {
  // put setup code here
  img = loadImage("../img/parallax_bg_1024.png");
  createCanvas(1024, 416);
  background(255);
  imageMode(CORNER);
};

function draw() {

  // put drawing code here
  image(img, 0, 0);

  fill(255);
  textSize(48);
  text(" ", 100, 100);
  // text("here's some text maybe", 100, 100);
  // fill(255, 0, 0, 50);
  // ellipse(x, y, 100, 100);
  //
  // x = mouseX;
  // y = mouseY;
};
