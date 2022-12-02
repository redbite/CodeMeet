var mysql  = require('mysql');
var config = require('./config.json');

var pool = mysql.createPool({
    host     : config.host,
    port     : config.port,
    user     : config.user,
    password : config.password,
    database : config.database
});

exports.handler =  (event, context, callback) => { 

  //prevent timeout from waiting event loop
  context.callbackWaitsForEmptyEventLoop = false; //"errorMessage": " Task timed out after 3.00 seconds"
  //only for pool connection? try if you get an error timeout
      pool.getConnection(function(err,connection){
        
        var sql="SELECT * FROM tickets ORDER BY id_note DESC";
        connection.query(sql, function (error, result, fields) {
          connection.release();
          //IF ELSE RESULTS WITH CALLBACK
          if (error) {
            callback(error);
            console.log("show ticket if branch");
          }
          
          else {
            console.log("show ticket else branch");
            callback(null,result);
            
          }
         
        }); //fine di connection.query
      
      }); //fine di pool.getConnection
}
