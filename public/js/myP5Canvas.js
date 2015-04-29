
var img;
var x = 0;
var y = 0;

function setup() {
  // put setup code here
  img = loadImage("../img/paint.png");
  createCanvas(2000, 950);
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
