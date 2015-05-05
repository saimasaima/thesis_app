
$(document).ready(function() {
  //anything that needs to load AFTER the page has loaded...
  console.log("loaded myDataController");
});


//**********************************************
// >>>> jQUERY CLICK LISTENERS, etc <<<<<<

//when you click on "[ click to load news article ]" :
$('a.load-news').on('click', function(event){
  event.preventDefault();
  console.log("click on a.load-news");
  resetAll()
  socket.emit('news-search', 'two-detroits');
});

$('img.grcc').on('click', function(event){
  event.preventDefault();
  console.log("click on img.grcc");
  socket.emit('news-search', 'two-detroits');
});


function resetAll(){

  $(".article").empty();
}
// Whenever you click on the #restart div, open the search prompt
// $("#restart").click(function(event){
//   // Open a prompt to enter a search term after page loads:
//   searchTermPrompt();
// });


// // Whenever you click on the <img>, send out a 'stop' with value of 1
// $("img").click(function(event){
//   // Open a prompt to enter a search term after page loads:
//   socket.emit('stop', 1);
// });




//**********************************************
// >>>> ALL SOCKET IO SETUP AND LISTENERS <<<<<<

//initialize socket.io, open socket with server.
// var socket= io();


//**** comment this line out if you don't want it starting tweets immediately on load*****//
//socket.emit('search', 'bieber'); //emit a search command with the term

socket.on('initData', function (data) {
  console.log('data controller got init');
  // console.log('got init data: '+JSON.stringify(data));
  
});


// Whenever the server passes us a 'tweet', show the message
socket.on('tweet', function (data) {
  thisTweet = data.toString();
  tweetCount++;
  // console.log("received tweet from server: "+data);
  // console.log("tweetCount: "+tweetCount);
});



// Whenever the server passes a news article:
socket.on("article", function(thisArticle){
  console.log(thisArticle);
  $(".article").append(thisArticle); //append to the class .article in index.html
});

//*********************************************
