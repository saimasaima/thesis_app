/****
*
* EXPRESS SERVER WITH MONGODB CLIENT
* ==============================================
*
* >> WITH FRONTEND
*
* In terminal, run:
*
*   $ npm install     (to download/install the necessary modules)
*   $ node app.js     (to launch this node app)
*
*/

console.log("\n\n>>>>> loading Oldie Node App <<<<<\n")

var express     = require('express');
var colors      = require('colors');
var http        = require('http');
var util        = require('util');
var Twitter     = require('node-twitter');
var DetroitData = require('./app/DetroitParser');
var port = 8080; //select a port for this server to run on
var users;

var jsonData; //will hold parsed JSON data

DetroitData.setup(function(e, data){
  if(e) return console.error("error reading JSON data file: "+e);
  jsonData = data;
  console.log('jsonData loaded! '.green)
  console.log('sections count: '.gray+jsonData.sections.length);
  // console.log(JSON.stringify(jsonData, null, '\t')); //print the whole thing out
});

var GoogleNews, googleNews;

GoogleNews = require('google-news');
googleNews = new GoogleNews();


/****
* GOOGLE NEWS SEARCH FUNCTION
* ==============================================
*
*/
function getNews(query){
  var numStoriesReported = 0;
  googleNews.stream(query, function(stream) {

    stream.on(GoogleNews.DATA, function(data) {
      io.emit('article', data.description);
      numStoriesReported++;
      // console.log("storyNumber: "+numStoriesReported);
      return console.log('News Event #'.cyan+numStoriesReported+': '.cyan + data.title);
   //   return console.log('Data Event received... ' + JSON.stringify(data));

    });

    stream.on(GoogleNews.ERROR, function(error) {
      return console.log('Error Event received... ' + error);
    });
  });
}



/****
* TWITTER configuration
* ==============================================
*
*/
var twitterStreamClient = new Twitter.StreamClient(
    'bAVZ7rBZ2QMqboXEtMPnRpCvK',
    'pje8rlOyGV9Rn7NRYJ9K7hZ5i8kZwmoBtD2MJQ8hCzqEE7amjy',
    '15753430-HEgWgh8CnqtrJe5QcNR3C0jPt3E9yRdwUmMPYQecX',
    'whPI5kbExfxoiBOt8v8WtJsg6oezGFU0sXdInsEoNJtlx'
);

twitterStreamClient.on('close', function() {
    console.log('Connection closed.');
});
twitterStreamClient.on('end', function() {
    console.log('End of Line.');
});
twitterStreamClient.on('error', function(error) {
    console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
});
twitterStreamClient.on('tweet', function(tweet) {
  console.log("incoming tweet:".cyan);
  console.log("tweet.user.screen_name: "+tweet.user.screen_name);
  console.log("tweet.text: "+tweet.text);
//  console.log(tweet); //
  console.log("----------------------------");
  io.emit('tweet', tweet.text);
});

//***************** !!! *****************
//*** uncomment me if you want me to start up with a search term on load! ***//
//twitterStreamClient.start(['basketball']);



/****
* CONFIGURE the express application
* ==============================================
*
*/
//instantiate object of express as app
var app = express();
//use the public folder to serve files and directories STATICALLY (meaning from file)
app.use(express.static(__dirname+ '/public'));




/****
* ROUTES
* ==============================================
* - these are the HTTP /routes that we can hit
* - NOTE: you're not using any routes right now. no need, yet...
*/

//input GET route for when we are SAVING DATA to our database
// app.get('/input', function(req,res){ // expecting:  localhost:8080/input?name=myName&data=myData
//   console.log(">> /INPUT query from URL: ".cyan + JSON.stringify(req.query));
//   res.send(">> /INPUT query from URL: " + JSON.stringify(req.query));
// });


// //output GET route for when we are READING data from database
// app.get("/output",function(req,res){ // /output?name=myName
// 	console.log(">> /OUTPUT query from URL: ".yellow+JSON.stringify(req.query));
//   res.send(">> /OUTPUT query from URL: "+JSON.stringify(req.query));
// });

// when anyone (any client) hits this GET route, serve the jsonData object.
app.get('/getJsonData', function(req,res){
  
  console.log('GET request for jsonData');
  
  res.json(jsonData);
});

/****
* START THE HTTP SERVER
* ==============================================
*
*/
var server=http.createServer(app).listen(port, function(){
  console.log();
  console.log('  HTTP Express Server Running!  '.white.inverse);
  var listeningString = ' Magic happening on port: '+ port +"  ";
  console.log(listeningString.cyan.inverse);

});


/****
* START UP SOCKET SERVERS TO COMMUNICATE WITH FRONT END
* ==============================================
*
*/


//*** set up socketIO (browser websocket) connections ***
var io = require('socket.io')(server);

io.on('connection', function(websocket){

  console.log(">>> new websocket client connection made".green)
  io.emit('initData',jsonData);
  // console.log(util.inspect(websocket)); //whoa there!! whole bunch of info...


  //---- NEWS SOCKET COMMANDS
  //when we get a websocket event for 'news-search'
  websocket.on('news-search', function(data){
    console.log("executing news search for: "+JSON.stringify(data));
    getNews(data); //pass in the query from the front end data!
  });


  //---- TWITTER SOCKET COMMANDS
  //when we get a websocket event named "search" -- twitter search!
  websocket.on('search', function(data){
    //do something with the data you just got?
    console.log("socket IO search: ".cyan + JSON.stringify(data));
    //stop the client (in case it's running)
    twitterStreamClient.stop(function(e,t){
      console.log("twitterStreamClient STOPPED".red);
      twitterStreamClient.start([data]);
      console.log("twitterStreamClient STARTED with search: ".green + data);
    })
  });

  //when we get a websocket event named "stop"
  websocket.on('stop', function(data){ //we received a "stop" command from the browser socket
    twitterStreamClient.stop(function(e,t){
      console.log("twitterStreamClient STOPPED".red);
    })
    console.log("socket IO CLICK: ".green + JSON.stringify(data));
  });

  websocket.on('disconnect', function(data){
    socketIOConnections = []; // wipe out our array, everyone will get re-added... TODO: much better ways to handle this...
    console.log("websocket DISCONNECTED: ".red+data.toString());
  })
});
