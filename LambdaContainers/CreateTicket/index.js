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

        const submitted_by=event.submitted_by;
        const title=event.ticket_title;
        const text=event.ticket_text;
        const priority=event.priority;

/*tickets(id_note, user_submitted_by,titolo ,text , data_published , data_solved , user_solved_by, solution , priority);
*/
//INSERT INTO tickets VALUES ('','','','',NOW(),NOW(),'','');
var sql0="INSERT INTO tickets VALUES ('','Andrea','SQL Connection to server failed', 'When i try to connect to MySQL DB by prompting mysql -u ubuntu@localhost -p dbpassword with ssh config.json, i get the error : your key have too open permissions. Change it to read only',NOW(),'','','','HIGH PRIORITY')";
        var sql="INSERT INTO tickets VALUES ('','"+submitted_by+"','"+title+"','"+text+"',NOW(),'','','','"+priority+"')";
        connection.query(sql, function (error, result, fields) {
          connection.release();
          //IF ELSE RESULTS WITH CALLBACK
          if (error) {
            callback(error);
            console.log("create ticket if branch");
          }
          
          else {
            console.log("create ticket else branch");
            callback(null,result);
            
          }
         
        }); //fine di connection.query
      
      }); //fine di pool.getConnection
}
