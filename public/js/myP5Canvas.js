

$(document).ready(function() {
  //anything that needs to load AFTER the page has loaded...
  console.log("loaded myP5Canvas");
});


//vars
var img;
var x = 0;
var y = 0;

var jsonData; //will hold all json data
var socket; //will hold socket
var resetAll;
var jsonParsed;
var canvasSections = []; //will hold an array of section objects
var sectionImgsRevealed = [];

function preload(){
  console.log('hit preload');
  var _jsonData = loadJSON('/getJsonData');
  _jsonData = JSON.parse(JSON.stringify(_jsonData));
  img = loadImage("../img/parallax_bg_1024.png"); //TODO: put in data.json file!
  //console.log('_jsonData: '+JSON.stringify(_jsonData));  
};

function setup() {
  // setup function
  console.log('hit setup, got json data with total section count: '+jsonData.sections.length);
  // console.log(JSON.stringify(jsonData)); //print out all data
  
  jsonParsed = JSON.parse(JSON.stringify(jsonData));

  createCanvas(jsonParsed.canvas_width, jsonParsed.canvas_height);
  background(255);
  imageMode(CORNER);

  refreshBgImg();

  //**** will be useful later!! ****//
  // jsonParsed.sections.forEach(function(sect, i){
  //   console.log('sect '+i+' : '+JSON.stringify(sect));
  //   var thisSection = {
  //     imgLink: sect.click_img,
  //     coords: sect.coords
  //   };
  //   canvasSections.push(thisSection);
  // });
  // console.log('all sections::: \n'+JSON.stringify(canvasSections,null,'\t'));
  //******************************
}

/***
// DRAW LOOP !
//
*/
function draw() {
  // noLoop(); // pausing the loop for now!

  // textSize(48);
  // text(" ", 100, 100);
  // text("here's some text maybe", 100, 100);
  // fill(255, 0, 0, 50);
  // ellipse(x, y, 100, 100);

  /*** uncomment me to draw all boxes! ***/
  // fill(255);
  // jsonParsed.sections.every(function(sect, index){
  //   rect(sect.coords[0], sect.coords[1], sect.coords[2], sect.coords[3]);
  //   return true; 
  // });
  /*********** end draw all boxes *************/
};

/***
// MOUSE CLICKED
//
*/
function mouseClicked() {
  console.log('mClicked:\tx: '+mouseX+'\ty: '+mouseY);

  var currSection;
  var notInside = jsonParsed.sections.every(checkIfInside);

  // console.log('notInside:', notInside);
  if( !notInside ){ //if we are inside of something!
    drawSectionImage(currSection);
  } else {
    refreshBgImg();
  }

  function checkIfInside(sect, index, array) {
    if(mouseX > sect.coords[0] && mouseX < sect.coords[0]+sect.coords[2]
      && mouseY > sect.coords[1] && mouseY < sect.coords[1] + sect.coords[3] ){
      console.log("CLICKED INSIDE OF SECT: "+index);
      currSection = jsonParsed.sections[index];
      return false;
    }
    return true;  
  }
}

/***
// MOUSE MOVED
//
*/
function mouseMoved() {
  console.log('x: '+mouseX+'\ty: '+mouseY);
  var currSection;
  var currIdx;
  var notInside = jsonParsed.sections.every(checkIfInside);

  // console.log('notInside:', notInside);
  if( !notInside ){ //if we are inside of something!
    drawSectionOutline(currSection, currIdx);
  } else {
    refreshBgImg();
  }

  function checkIfInside(sect, index, array) {
    if(mouseX > sect.coords[0] && mouseX < sect.coords[0]+sect.coords[2]
      && mouseY > sect.coords[1] && mouseY < sect.coords[1] + sect.coords[3] ){
      console.log("MOVED INSIDE OF SECT: "+index);
      currIdx = index;
      currSection = jsonParsed.sections[index];
      return false;
    }
    return true;  
  }
}


/***
// DRAW SECTION IMAGE
//
*/
function drawSectionImage(thisSection, idx){
  console.log('drawing thisSection: '+JSON.stringify(thisSection,null,'\t'));
  fill(255);
  var thisImg = '../'+thisSection.click_img;
  console.log('this image: '+thisImg);

  loadImage(thisImg, function(img) {
    var thisImg = {
      image : img,
      section : thisSection
    };
    sectionImgsRevealed.push(thisImg);
    var searchQuery = '';
    thisSection.query_terms.forEach(function(term, id){
      searchQuery += (' '+term);
    });
    resetAll();
    console.log('>>> sending search query: '+searchQuery);
    socket.emit('news-search', searchQuery);
    image(img, thisSection.coords[0], thisSection.coords[1], thisSection.coords[2], thisSection.coords[3] );
  });
}

/***
// DRAW SECTION OUTLINE
//
*/
function drawSectionOutline(thisSection){
  // console.log('thisSection: '+JSON.stringify(thisSection,null,'\t'));
  refreshBgImg();
  strokeWeight(5);
  stroke(255);
  noFill();
  rect(thisSection.coords[0], thisSection.coords[1], thisSection.coords[2], thisSection.coords[3]);

  fill(255);
  strokeWeight(3);
  stroke(255, 0);
  textSize(12);
  text(thisSection.section, mouseX-15, mouseY-5);
}


/***
// REFRESH THE BACKGROUND!
// - including all images already clicked
*/
function refreshBgImg(){
  fill(255);
  image(img, 0, 0);

  //draw all the images that have already been clicked on!
  sectionImgsRevealed.forEach(function(thisImage, idx){
    image(thisImage.image, thisImage.section.coords[0], thisImage.section.coords[1], thisImage.section.coords[2], thisImage.section.coords[3] );
  })  
}


/***
// INIT METHODS FOR THIS CANVAS' IFRAME
//
*/
function init() { window.parent.setUpFrame(); return true; }
function yourMethod(_jsonData, _reset, _socket) { 
  console.log('hit yourMethod');
  jsonData = _jsonData;
  socket = _socket;
  resetAll = _reset;
  //console.log('got jsonData: '+JSON.stringify(jsonData, null, '\t')); 
}
