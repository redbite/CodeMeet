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

        const solved_by=event.solved_by;
        const solution=event.solution;
        const box_solution_var=event.box_solution_var;


        var sql0="UPDATE tickets SET data_solved = NOW(), user_solved_by= 'Mike', solution = 'Bug fixed' WHERE id_note='1';";
        var sql="UPDATE tickets SET data_solved = NOW(), user_solved_by= '"+solved_by+"', solution = '"+solution+"' WHERE id_note='"+box_solution_var+"';";
        connection.query(sql, function (error, result, fields) {
          connection.release();
          //IF ELSE RESULTS WITH CALLBACK
          if (error) {
            callback(error);
            console.log("AAA NULL");
          }
          
          else {
            console.log("rdscdacxcdggg");
            callback(null,result);
            
          }
         
        }); //fine di connection.query
      
      }); //fine di pool.getConnection
}
