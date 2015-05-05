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


module.exports.setup = function(jsonFile, callback){

  console.log(jsonFile);

  var obj = JSON.parse(config);
  
  if(obj.sections.length > 10) return callback('obj appears incomplete!!');

  callback(null, obj);
}