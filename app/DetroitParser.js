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

var fs = require('fs');
var config = require('./data.json');
var json;


module.exports.setup = function(callback){

  console.log('parsing data.json file...'.gray);
  var obj = JSON.parse(JSON.stringify(config));
  // console.log(JSON.stringify(obj));
  // console.log(JSON.stringify(obj.sections.length, null, '\t')); //print the whole thing out
  
  if(obj.sections.length < 10) return callback('obj appears incomplete!!');

  callback(null, obj);
}