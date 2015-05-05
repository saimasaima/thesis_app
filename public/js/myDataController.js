
$(document).ready(function() {
  //anything that needs to load AFTER the page has loaded...
  console.log("loaded myDataController");
  $('p5canvas').width(jsonData.canvas_width);
  $('p5canvas').height(jsonData.canvas_height);
});

var jsonData = {};



/***
// RESET ALL
// - clear out any divs that we're about to repopulate
*/
function resetAll(){

  $('.article').empty();
  $('.title').empty();
  $('.description').empty();
  $('.summary').empty();
  $('.author').empty();
  $('.body').empty();
  $('.tweets').empty();
}


/***
// SET DATA
// - when a click goes down on the painting,
//   the entire section's data gets sent here
*/
function setData(thisSection){

  console.log("got setData: "+JSON.stringify(thisSection));
  $('.title').text(thisSection.section+': \t');
  $('.description').text(thisSection.featured.body);
  $('.featured-title').html('<a href='+thisSection.featured.link+'><h3>'+thisSection.section+'</h3></a><br>');
  $('.featured-summary').text('summary: '+thisSection.featured.body);
  $('.featured-author').text('author: '+thisSection.featured.author);
  $('.featured-body').text('body: ' +thisSection.featured.body);

  var thisQuery = '';
  thisSection.query_terms.forEach(function(q, i, a){
    console.log(i);
    if(i>0) thisQuery += (' '+q);
    else thisQuery += q;
  })
  // socket.emit('search', thisQuery);
  // socket.emit('search', 'bieber');
}



//**********************************************
// >>>> jQUERY CLICK LISTENERS, etc <<<<<<

//when you click on "[ click to load news article ]" :
// $('a.load-news').on('click', function(event){
//   event.preventDefault();
//   console.log("click on a.load-news");
//   resetAll()
//   socket.emit('news-search', 'two-detroits');
// });
// // $("#restart").click(function(event){
// $('img.grcc').on('click', function(event){
//   event.preventDefault();
//   console.log("click on img.grcc");
//   socket.emit('news-search', 'two-detroits');
// });


//**********************************************
// >>>> ALL SOCKET IO SETUP AND LISTENERS <<<<<<

//**** comment this line out if you don't want it starting tweets immediately on load*****//
//socket.emit('search', 'bieber'); //emit a search command with the term

socket.on('initData', function (data) {
  console.log('data controller got init');
  jsonData = data;

  // console.log('got init data: '+JSON.stringify(data));
  
});

var tweetCount = 0;
var maxTweets = 10;
var tweetsToShow = new Array(maxTweets);
// Whenever the server passes us a 'tweet', show the message
socket.on('tweet', function (data) {
  thisTweet = data.toString();
  tweetCount++;
  console.log("received tweet from server: "+data);
  console.log("tweetCount: "+tweetCount);
  if(tweetCount > maxTweets) tweetCount = 0;
  tweetsToShow[tweetCount] = data;
  updateTweets();
  // $('.featured-tweets').text('body: ' +thisSection.featured.body);
});

function updateTweets(){

  tweetsToShow.forEach(function(tweet, i, a){
    $('.featured-tweets').append(tweet + '<br>');
  });
}


// Whenever the server passes a news article:
socket.on("article", function(thisArticle){
  // console.log(thisArticle);
  $(".article").append(thisArticle); //append to the class .article in index.html
});

//*********************************************

// >>>> init the painting p5 canvas <<<<<<

function setUpFrame() { 
  var frame = window.frames['p5canvas'];

  frame.yourMethod(jsonData, resetAll, setData, socket);
}
